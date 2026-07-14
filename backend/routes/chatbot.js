const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ reply: "Please enter a message." });
    }

    const query = message.toLowerCase().trim();

    // 1. Help Guide / Listing instructions
    if (query.includes('how to') || query.includes('list') || query.includes('post') || query.includes('sign up') || query.includes('register') || query.includes('sell')) {
      return res.json({
        reply: "To list your items, skills, or business on Ethiozone:\n\n1. Click **Be Our Partner** or **Login/Register** in the navbar.\n2. Create an account. Select **Handyman** if you offer trades, **Business** for storefronts, or **Individual** to sell personal items.\n3. Go to your **Dashboard**.\n4. Click **Create Listing**, fill in the details, and upload photos!\n\nYour post will go live instantly for customers to see."
      });
    }

    // 2. Querying Handyman / Hire Me
    if (query.includes('handyman') || query.includes('plumber') || query.includes('electrical') || query.includes('carpentry') || query.includes('painting') || query.includes('repair') || query.includes('hire') || query.includes('plumb') || query.includes('electrician') || query.includes('locksmith')) {
      const handymen = await Listing.find({
        $and: [
          {
            $or: [
              { type: 'handyman_skill' },
              { category: { $regex: 'plumbing|electrical|carpentry|painting|appliance|locksmith|masonry|tiling', $options: 'i' } }
            ]
          },
          {
            $or: [
              { title: { $regex: query, $options: 'i' } },
              { description: { $regex: query, $options: 'i' } },
              { category: { $regex: query, $options: 'i' } }
            ]
          }
        ]
      }).limit(3);

      if (handymen.length > 0) {
        let reply = "I found these matching Handyman (Hire Me) service skills:\n\n";
        handymen.forEach(h => {
          reply += `- **${h.title}** (Estimate: ${h.metadata?.handymanRates || 'Inquire'}).\n`;
        });
        return res.json({ reply });
      } else {
        return res.json({
          reply: "I couldn't find any specific handymen matching that skill right now. You can check the **Hire Me** category in the main menu to see all active providers."
        });
      }
    }

    // 3. Querying Jobs
    if (query.includes('job') || query.includes('work') || query.includes('hiring') || query.includes('opening') || query.includes('salary') || query.includes('position')) {
      const jobs = await Listing.find({
        type: 'job_opening',
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
        ]
      }).limit(3);

      if (jobs.length > 0) {
        let reply = "Here are some job openings currently active on the platform:\n\n";
        jobs.forEach(j => {
          reply += `- **${j.title}** (Salary Offered: $${j.price || 'Discuss'}).\n`;
        });
        return res.json({ reply });
      } else {
        const generalJobs = await Listing.find({ type: 'job_opening' }).limit(3);
        if (generalJobs.length > 0) {
          let reply = "I couldn't find exact keyword matches, but here are our latest job openings:\n\n";
          generalJobs.forEach(j => {
            reply += `- **${j.title}** (Salary: $${j.price || 'Discuss'}).\n`;
          });
          return res.json({ reply });
        }
        return res.json({ reply: "There are currently no job openings listed. Check back soon!" });
      }
    }

    // 4. Querying Real Estate / Houses
    if (query.includes('house') || query.includes('apartment') || query.includes('rent') || query.includes('land') || query.includes('property') || query.includes('real estate') || query.includes('bedroom')) {
      const houses = await Listing.find({
        type: 'house',
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
        ]
      }).limit(3);

      if (houses.length > 0) {
        let reply = "Here are real estate options listed on Ethiozone:\n\n";
        houses.forEach(h => {
          reply += `- **${h.title}** ($${h.price || 'Call for Price'}). ${h.metadata?.bedrooms || 0} Bed, ${h.metadata?.bathrooms || 0} Bath ${h.metadata?.propertyType || 'House'}.\n`;
        });
        return res.json({ reply });
      } else {
        const generalHouses = await Listing.find({ type: 'house' }).limit(3);
        if (generalHouses.length > 0) {
          let reply = "No exact keyword matches, but check out these houses:\n\n";
          generalHouses.forEach(h => {
            reply += `- **${h.title}** ($${h.price || 'Call'}).\n`;
          });
          return res.json({ reply });
        }
        return res.json({ reply: "We don't have any real estate listings currently. Check back later!" });
      }
    }

    // 5. Querying Car / Automotive
    if (query.includes('car') || query.includes('vehicle') || query.includes('automotive') || query.includes('toyota') || query.includes('ford') || query.includes('mileage')) {
      const cars = await Listing.find({
        type: 'car',
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
        ]
      }).limit(3);

      if (cars.length > 0) {
        let reply = "I found these vehicles listed:\n\n";
        cars.forEach(c => {
          reply += `- **${c.title}** ($${c.price}). Make/Model: ${c.metadata?.make || ''} ${c.metadata?.model || ''}.\n`;
        });
        return res.json({ reply });
      } else {
        return res.json({ reply: "I didn't find any matches in the automotive listings. Try checking the **Automotive** category badge in the navbar!" });
      }
    }

    // 6. Pharmacy / Doctor prescription / customer requests
    if (query.includes('prescription') || query.includes('pharmacy') || query.includes('medication') || query.includes('doctor') || query.includes('chemist')) {
      return res.json({
        reply: "To submit a doctor's prescription, locate any **Pharmacy** store on the homepage, click on their storefront, and press the **Upload & Send Prescription** button. Fill out your details in the modal, and the pharmacist will be alerted instantly!"
      });
    }

    // 7. General Fallback
    return res.json({
      reply: "I'm here to help you navigate Ethiozone! You can ask me questions like:\n- *How do I list my business?*\n- *Find a plumber*\n- *Show me job openings*\n- *Real estate rent options*\n- *How do I submit doctor prescriptions?*"
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ reply: "Sorry, I ran into an error while processing that. Please try again." });
  }
});

module.exports = router;
