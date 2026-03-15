require('dotenv').config();
const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
const connectDB = require('../config/db');

const topics = [
  'Environment and Ecology Basic Understanding',
  'Introduction',
  'Categories of Environment',
  'Features of Environment',
  'Components of Environment',
  'Ecology',
  'Ecosystem and Its Dynamics',
  'Ecosystem Definitions',
  'Properties of Ecosystem',
  'Components of Ecosystem',
  'Abiotic Factors',
  'Biotic Factors',
  'Ecosystem Dynamics',
  'Biogeochemical Cycles',
  'Gaseous Cycle',
  'Carbon Cycle',
  'Human Impact on the Carbon Cycle',
  'Effects of High Concentration of Greenhouse Gases',
  'Hydrological Cycle',
  'Nitrogen Cycle',
  'Human Impact on the Nitrogen Cycle',
  'Oxygen Cycle',
  'Sedimentary Cycle',
  'Sulphur Cycle',
  'Human Impact on the Sulphur Cycle',
  'Phosphorus Cycle',
  'Types of Ecosystems',
  'Terrestrial Ecosystem',
  'Aquatic Ecosystem',
  'Changes in Ecosystem',
  'Ecosystem Conservation',
  'Ecology vs Economy',
  'Population Ecology',
  'Population Characteristics',
  'Population Growth Models',
  'Species',
  'Carrying Capacity of Earth',
  'Biosphere',
  'Extent of Biosphere',
  'Working of Biosphere',
  'Importance of Biosphere',
  'Alpha Beta Gamma Diversity',
  'Biomes',
  'Global Biomes',
  'Major Biomes of the World',
  'WWF Classification of Biomes',
  'Terrestrial Biomes',
  'Aquatic Biomes',
  'Indian Biomes',
  'Biodiversity',
  'Types of Biodiversity',
  'Value of Biodiversity',
  'Threats to Biodiversity',
  'Causes of Biodiversity Loss',
  'Invasive Species',
  'Effects of Biodiversity Loss',
  'Extinction of Species',
  'Types Natural',
  'Mass',
  'Anthropogenic',
  'Causes of Extinction',
  'Consequences of Extinction',
  'Biodiversity Conservation',
  'Conservation Strategies',
  'Conservation Tools',
  'IUCN',
  'IUCN Red List',
  'Ecologically Sensitive Area',
  'In situ Conservation',
  'Advantages',
  'Disadvantages',
  'Ex situ Conservation',
  'Pollution and Environmental Degradation',
  'Land Degradation',
  'Desertification',
  'Soil Erosion',
  'Sustainable Land Management',
  'Air Pollution',
  'Marine Pollution',
  'Mining Pollution',
  'Noise Pollution',
  'Radioactive Pollution',
  'Water Pollution',
  'Waste Management',
  'Solid Waste Management',
  'E waste Management',
  'Biomedical Waste',
  'Hazardous Waste',
  'Waste Treatment',
  'Climate Change',
  'Factors Affecting Climate Change',
  'Impact of Climate Change',
  'Climate Change Management',
  'International Conventions',
  'Environmental Organisations',
  'Environmental Impact Assessment',
  'Impact of Agriculture',
  'Sustainable Agriculture',
  'Hi Tech Farming',
  'Rain Water Harvesting',
  'Green Buildings',
  'Eco Tourism',
];

const slugify = (text = '') =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .trim();

const seed = async () => {
  await connectDB();
  await Lesson.deleteMany({});
  const lessons = topics.map((title, index) => ({
    title,
    slug: slugify(title),
    topic: title,
    images: [`https://source.unsplash.com/1600x900/?nature,${index}`],
    content: `Explore ${title} in depth and understand its role in sustaining ecosystems.`,
    keyPoints: [
      `${title} gives context to modern environmental challenges.`,
      'Natural rhythms and human decisions intersect here.',
      'This lesson ties into the broader conservation story.',
    ],
    tags: ['nature', 'ecology', 'education'],
    durationMinutes: 15 + Math.ceil(index / 5),
  }));
  await Lesson.insertMany(lessons);
  console.log(`Seeded ${lessons.length} lessons`);
  mongoose.connection.close();
};

seed().catch((error) => {
  console.error('Seed failed', error);
  process.exit(1);
});
