// ========================================
// TIMELINE DATA
// Complete history from Big Bang to Modern Humans
// ========================================

import type { TimelineEra } from '../types/timeline';

export const timelineData: TimelineEra[] = [
  {
    id: "universe",
    era: "universe",
    icon: "💥",
    title: "The Big Bang",
    time: "13.8 Billion Years Ago",
    timeValue: 13800000000,
    description: "The universe explodes into existence from an infinitely dense singularity. All matter, energy, space, and time begin here.",
    highlight: "Origin of Everything",
    color: "#00f5ff",
    details: `The Big Bang wasn't an explosion IN space—it was the rapid expansion OF space itself. In the first fraction of a second, the universe expanded faster than the speed of light (inflation). Within minutes, the first atomic nuclei formed. It took 380,000 years for atoms to form and light to travel freely, creating the Cosmic Microwave Background we still detect today.`,
    funFact: "If the universe's history were compressed into 1 year, humans would appear in the last 14 seconds of December 31st!",
    timePerspective: "If this was 1 year ago, humans appeared in the last 23 minutes.",
    subEvents: [
      { icon: "⚡", title: "Inflation Period", time: "10⁻³⁶ seconds", description: "Universe expands exponentially" },
      { icon: "🔥", title: "Quark Epoch", time: "10⁻¹² seconds", description: "Quarks and gluons form" },
      { icon: "⚛️", title: "Nucleosynthesis", time: "3 minutes", description: "First hydrogen and helium nuclei" },
      { icon: "✨", title: "First Light", time: "380,000 years", description: "Atoms form, universe becomes transparent" },
      { icon: "🌟", title: "First Stars", time: "100-400 million years", description: "Cosmic dark ages end" }
    ]
  },
  {
    id: "solar",
    era: "solar",
    icon: "☀️",
    title: "Solar System Forms",
    time: "4.6 Billion Years Ago",
    timeValue: 4600000000,
    description: "A giant molecular cloud collapses, forming our Sun and the planets from swirling disk of gas and dust.",
    highlight: "Our Cosmic Home",
    color: "#ffd700",
    details: `Our solar system formed from the gravitational collapse of a region within a giant molecular cloud. The collapse may have been triggered by a nearby supernova explosion. As the cloud collapsed, it flattened into a disk with the Sun at the center. Planets formed through accretion—dust grains stuck together, forming rocks, then planetesimals, then protoplanets.`,
    funFact: "The Sun contains 99.86% of all mass in our solar system.",
    subEvents: [
      { icon: "🌀", title: "Nebula Collapse", time: "4.6 BYA", description: "Giant molecular cloud begins to collapse" },
      { icon: "☀️", title: "Sun Ignites", time: "4.6 BYA", description: "Nuclear fusion begins in the core" },
      { icon: "🪨", title: "Planetesimals Form", time: "4.5 BYA", description: "Rocks begin accumulating" },
      { icon: "🌍", title: "Rocky Planets", time: "4.5 BYA", description: "Inner planets take shape" },
      { icon: "🌊", title: "Gas Giants", time: "4.5 BYA", description: "Jupiter and Saturn form rapidly" }
    ]
  },
  {
    id: "earth",
    era: "earth",
    icon: "🌍",
    title: "Earth Forms",
    time: "4.5 Billion Years Ago",
    timeValue: 4500000000,
    description: "Earth coalesces from debris orbiting the young Sun. A massive collision creates the Moon.",
    highlight: "Birth of Our World",
    color: "#00ff88",
    details: `Earth formed through accretion of planetesimals. The early Earth was a hellish place—molten rock, constant bombardment, and no oxygen. About 4.5 billion years ago, a Mars-sized body called Theia collided with Earth, ejecting debris that formed the Moon. This impact tilted Earth's axis, giving us seasons.`,
    funFact: "The Moon is slowly moving away from Earth at about 3.8cm per year.",
    subEvents: [
      { icon: "🔴", title: "Molten Earth", time: "4.5 BYA", description: "Planet is entirely molten magma" },
      { icon: "🌙", title: "Moon-Forming Impact", time: "4.5 BYA", description: "Theia collides with Earth" },
      { icon: "💨", title: "Atmosphere Forms", time: "4.4 BYA", description: "Volcanic outgassing creates atmosphere" },
      { icon: "💧", title: "First Oceans", time: "4.4 BYA", description: "Water vapor condenses into oceans" },
      { icon: "☄️", title: "Late Heavy Bombardment", time: "4.1-3.8 BYA", description: "Intense asteroid impacts" }
    ]
  },
  {
    id: "life",
    era: "life",
    icon: "🦠",
    title: "First Life",
    time: "3.8 Billion Years Ago",
    timeValue: 3800000000,
    description: "Simple single-celled organisms emerge in the primordial oceans. Life begins its incredible journey.",
    highlight: "Spark of Life",
    color: "#00ffcc",
    details: `The origin of life remains one of science's greatest mysteries. Life likely began in hydrothermal vents or warm shallow pools. The first organisms were simple prokaryotes (bacteria-like cells without nuclei). These early life forms were anaerobic—they didn't use oxygen. They likely used chemical energy from the environment.`,
    funFact: "You share 50% of your DNA with a banana!",
    subEvents: [
      { icon: "🧬", title: "RNA World", time: "~4 BYA", description: "Self-replicating molecules emerge" },
      { icon: "🔬", title: "First Cells", time: "3.8 BYA", description: "Lipid membranes enclose chemistry" },
      { icon: "🦠", title: "Prokaryotes", time: "3.5 BYA", description: "Bacteria dominate early Earth" },
      { icon: "🌊", title: "Stromatolites", time: "3.5 BYA", description: "Microbial mats form rock structures" },
      { icon: "💚", title: "Photosynthesis", time: "3.4 BYA", description: "Organisms begin capturing sunlight" }
    ]
  },
  {
    id: "complex",
    era: "complex",
    icon: "🔵",
    title: "Complex Cells Evolve",
    time: "2.1 Billion Years Ago",
    timeValue: 2100000000,
    description: "Eukaryotic cells with nuclei appear. One cell engulfs another, creating mitochondria—a revolution in cellular power.",
    highlight: "Cellular Revolution",
    color: "#ff6b6b",
    details: `The Great Oxygenation Event (2.4 BYA) changed everything. Photosynthetic cyanobacteria had been pumping oxygen into the atmosphere for millions of years. This oxygen was toxic to most life! But it also enabled a new, more efficient form of energy production. Eukaryotic cells (cells with nuclei) emerged, likely through endosymbiosis—one cell engulfing another.`,
    funFact: "Mitochondria have their own DNA, evidence of their bacterial origin.",
    subEvents: [
      { icon: "💨", title: "Great Oxygenation", time: "2.4 BYA", description: "Oxygen fills the atmosphere" },
      { icon: "❄️", title: "Snowball Earth", time: "2.4 BYA", description: "Global glaciation event" },
      { icon: "⚡", title: "Mitochondria", time: "2.1 BYA", description: "Powerhouses of cells emerge" },
      { icon: "🟢", title: "Chloroplasts", time: "1.5 BYA", description: "Plants gain photosynthesis" },
      { icon: "🧫", title: "First Eukaryotes", time: "2.1 BYA", description: "Cells with nuclei appear" }
    ]
  },
  {
    id: "cambrian",
    era: "cambrian",
    icon: "🦐",
    title: "Cambrian Explosion",
    time: "540 Million Years Ago",
    timeValue: 540000000,
    description: "Life explodes in diversity! Most major animal groups appear in a geologically brief period. Eyes, shells, and predators emerge.",
    highlight: "Explosion of Life",
    color: "#ffa502",
    details: `The Cambrian Explosion is one of the most remarkable events in Earth's history. In just 20-25 million years, nearly all major animal phyla appeared. Creatures developed hard shells, eyes, and complex body plans. Predators emerged, triggering an evolutionary arms race. The Burgess Shale preserves incredible fossils from this time.`,
    funFact: "The Cambrian Explosion happened in just 0.1% of Earth's history but produced most animal body plans.",
    subEvents: [
      { icon: "👁️", title: "First Eyes", time: "540 MYA", description: "Vision revolutionizes predation" },
      { icon: "🐚", title: "Hard Shells", time: "540 MYA", description: "Protective exoskeletons appear" },
      { icon: "🦑", title: "Anomalocaris", time: "520 MYA", description: "First apex predator (1m long!)" },
      { icon: "🌊", title: "Trilobites", time: "520 MYA", description: "Iconic armored arthropods" },
      { icon: "🧠", title: "Pikaia", time: "505 MYA", description: "Early ancestor of vertebrates" }
    ]
  },
  {
    id: "fish",
    era: "fish",
    icon: "🐟",
    title: "Age of Fish",
    time: "480 Million Years Ago",
    timeValue: 480000000,
    description: "Vertebrates evolve and diversify. Fish develop jaws, bones, and will eventually give rise to all land vertebrates.",
    highlight: "Backbone Begins",
    color: "#3498db",
    details: `The first vertebrates were jawless fish. The evolution of jaws was revolutionary—it allowed active predation. Fish diversified into countless forms: armored placoderms, sharks, bony fish. The lobe-finned fish (like Tiktaalik) developed sturdy fins that would eventually become limbs.`,
    funFact: "You still have fish genes that control your arm and hand development!",
    subEvents: [
      { icon: "🐠", title: "Jawless Fish", time: "480 MYA", description: "First vertebrates appear" },
      { icon: "🦈", title: "Jawed Fish", time: "440 MYA", description: "Jaws revolutionize feeding" },
      { icon: "🛡️", title: "Placoderms", time: "420 MYA", description: "Armored fish dominate seas" },
      { icon: "🦴", title: "Bony Fish", time: "420 MYA", description: "Internal skeleton evolves" },
      { icon: "🐊", title: "Lobe-Finned Fish", time: "400 MYA", description: "Ancestors of land animals" }
    ]
  },
  {
    id: "land",
    era: "land",
    icon: "🌿",
    title: "Life Conquers Land",
    time: "470 Million Years Ago",
    timeValue: 470000000,
    description: "Plants colonize land, followed by arthropods and eventually vertebrates. The continents turn green.",
    highlight: "Terrestrial Pioneer",
    color: "#2ecc71",
    details: `Life's move to land was gradual. Plants came first, developing roots, stems, and eventually seeds. Arthropods (insects, spiders) followed. The first vertebrates to walk on land were tetrapods—four-limbed creatures evolved from lobe-finned fish. Tiktaalik (375 MYA) is a famous "fishapod" showing this transition.`,
    funFact: "Early land plants had to evolve entirely new structures—nothing in the ocean prepared them for gravity and drying out.",
    subEvents: [
      { icon: "🌱", title: "First Land Plants", time: "470 MYA", description: "Simple plants colonize shores" },
      { icon: "🌲", title: "Vascular Plants", time: "420 MYA", description: "Plants develop transport systems" },
      { icon: "🕷️", title: "Land Arthropods", time: "430 MYA", description: "Insects and spiders emerge" },
      { icon: "🌳", title: "First Forests", time: "380 MYA", description: "Trees transform the landscape" },
      { icon: "🦎", title: "Tiktaalik", time: "375 MYA", description: "Fish with limbs crawls ashore" }
    ]
  },
  {
    id: "reptiles",
    era: "reptiles",
    icon: "🦎",
    title: "Rise of Reptiles",
    time: "320 Million Years Ago",
    timeValue: 320000000,
    description: "Amniotes evolve eggs that can survive on land. Reptiles diversify and begin their dominance.",
    highlight: "Amniotic Egg",
    color: "#9b59b6",
    details: `The amniotic egg was a crucial innovation—it allowed reproduction without water. Reptiles could now live entirely on land. They diversified into many forms, including the ancestors of mammals (synapsids) and dinosaurs (archosaurs). The Carboniferous period saw giant insects due to high oxygen levels.`,
    funFact: "The Permian extinction was so severe, it took 10 million years for life to fully recover.",
    subEvents: [
      { icon: "🥚", title: "Amniotic Egg", time: "320 MYA", description: "Reproduction freed from water" },
      { icon: "🐛", title: "Giant Insects", time: "300 MYA", description: "Dragonflies with 70cm wingspan" },
      { icon: "🦴", title: "Synapsids", time: "310 MYA", description: "Ancestors of mammals appear" },
      { icon: "🔥", title: "Permian Extinction", time: "252 MYA", description: "96% of species die—worst ever" },
      { icon: "🦕", title: "Archosaurs", time: "250 MYA", description: "Dinosaur ancestors emerge" }
    ]
  },
  {
    id: "dinosaurs",
    era: "dinosaurs",
    icon: "🦕",
    title: "Age of Dinosaurs",
    time: "230 Million Years Ago",
    timeValue: 230000000,
    description: "Dinosaurs rise to dominate Earth for 165 million years. Giants walk the land while pterosaurs rule the sky.",
    highlight: "Mesozoic Era",
    color: "#e74c3c",
    details: `The Mesozoic Era (Age of Reptiles) saw dinosaurs dominate for 165 million years—far longer than humans have existed! They ranged from chicken-sized to the massive Argentinosaurus (35m long). Birds evolved from theropod dinosaurs. Flowering plants appeared and transformed ecosystems.`,
    funFact: "Dinosaurs ruled for 165 million years. Humans have existed for only 0.3 million years.",
    timePerspective: "Dinosaurs existed for 800x longer than modern humans.",
    subEvents: [
      { icon: "🦖", title: "First Dinosaurs", time: "230 MYA", description: "Small bipedal predators appear" },
      { icon: "🦴", title: "Jurassic Giants", time: "200 MYA", description: "Sauropods grow massive" },
      { icon: "🦅", title: "First Birds", time: "150 MYA", description: "Archaeopteryx takes flight" },
      { icon: "🌸", title: "Flowering Plants", time: "130 MYA", description: "Angiosperms transform ecology" },
      { icon: "👑", title: "T. Rex Rules", time: "68 MYA", description: "Apex predator of the Cretaceous" }
    ]
  },
  {
    id: "mammals-rise",
    era: "mammals-rise",
    icon: "🐀",
    title: "First Mammals",
    time: "225 Million Years Ago",
    timeValue: 225000000,
    description: "Small, furry mammals evolve alongside dinosaurs. They remain small and nocturnal for millions of years.",
    highlight: "Humble Beginnings",
    color: "#f39c12",
    details: `Mammals evolved from synapsid reptiles during the Triassic period. Early mammals were small, shrew-like creatures that lived in the shadows of dinosaurs. Being nocturnal may have driven the evolution of warm-bloodedness and better hearing. Mammals developed specialized teeth, fur, and milk production.`,
    funFact: "Early mammals were so small, some could fit in the palm of your hand.",
    subEvents: [
      { icon: "🦔", title: "First Mammals", time: "225 MYA", description: "Tiny, shrew-like creatures" },
      { icon: "🔊", title: "Enhanced Hearing", time: "200 MYA", description: "Three middle ear bones evolve" },
      { icon: "🌙", title: "Nocturnal Life", time: "200 MYA", description: "Hiding from dinosaur predators" },
      { icon: "🦘", title: "Marsupials", time: "160 MYA", description: "Pouched mammals diverge" },
      { icon: "🐁", title: "Placental Mammals", time: "125 MYA", description: "Live birth becomes dominant" }
    ]
  },
  {
    id: "extinction",
    era: "extinction",
    icon: "☄️",
    title: "Mass Extinction",
    time: "66 Million Years Ago",
    timeValue: 66000000,
    description: "An asteroid strikes Earth, ending the dinosaurs' reign. 75% of species perish, opening the door for mammals.",
    highlight: "Cataclysmic Impact",
    color: "#ff006e",
    details: `A 10km asteroid struck the Yucatan Peninsula, creating the Chicxulub crater. The impact triggered tsunamis, wildfires, and a "nuclear winter" effect. Non-avian dinosaurs, pterosaurs, and marine reptiles went extinct. Birds (living dinosaurs) survived, along with mammals, crocodiles, and some other groups.`,
    funFact: "The asteroid impact released 10 billion times more energy than the atomic bombs dropped on Hiroshima.",
    timePerspective: "The asteroid that killed the dinosaurs was traveling at 20 km/s—40 times faster than a bullet.",
    subEvents: [
      { icon: "💥", title: "Asteroid Impact", time: "66 MYA", description: "10km asteroid hits Yucatan" },
      { icon: "🌊", title: "Mega-Tsunamis", time: "Hours later", description: "300m waves devastate coasts" },
      { icon: "🔥", title: "Global Wildfires", time: "Days later", description: "Debris ignites worldwide fires" },
      { icon: "❄️", title: "Impact Winter", time: "Months", description: "Dust blocks sunlight for years" },
      { icon: "💀", title: "75% Species Lost", time: "66 MYA", description: "Dinosaurs (except birds) die out" }
    ]
  },
  {
    id: "mammals",
    era: "mammals",
    icon: "🐘",
    title: "Age of Mammals",
    time: "55 Million Years Ago",
    timeValue: 55000000,
    description: "Mammals diversify explosively, filling niches left by dinosaurs. Giants emerge: whales, elephants, and more.",
    highlight: "Cenozoic Era",
    color: "#e67e22",
    details: `With dinosaurs gone, mammals exploded in diversity. Within 10 million years, all modern mammal orders had appeared. Whales returned to the sea, bats took to the air, and giants like Paraceratherium (largest land mammal ever) roamed Asia. The Eocene was particularly warm and tropical.`,
    funFact: "The largest land mammal ever was Paraceratherium—a hornless rhino standing 5m tall!",
    subEvents: [
      { icon: "🌴", title: "PETM Heat Event", time: "55 MYA", description: "Warmest period in 100MY" },
      { icon: "🐋", title: "Whales Evolve", time: "50 MYA", description: "Mammals return to the sea" },
      { icon: "🦇", title: "Bats Take Flight", time: "52 MYA", description: "Only flying mammals" },
      { icon: "🐘", title: "Proboscideans", time: "40 MYA", description: "Elephant ancestors appear" },
      { icon: "🐎", title: "Modern Mammals", time: "35 MYA", description: "Familiar groups diversify" }
    ]
  },
  {
    id: "primates",
    era: "primates",
    icon: "🐵",
    title: "Primate Evolution",
    time: "55 Million Years Ago",
    timeValue: 55000000,
    description: "Early primates evolve in tropical forests. Forward-facing eyes, grasping hands, and larger brains develop.",
    highlight: "Our Ancestors",
    color: "#8e44ad",
    details: `Primates evolved in the warm forests of the Paleocene and Eocene. They developed traits for tree life: forward-facing eyes for depth perception, grasping hands and feet, and larger brains. Early primates split into two groups: wet-nosed (lemurs, lorises) and dry-nosed (monkeys, apes, humans).`,
    funFact: "Your hands evolved for grasping branches, which is why you can play piano and use tools.",
    subEvents: [
      { icon: "🌳", title: "Tree Dwellers", time: "55 MYA", description: "Primates adapt to forest canopy" },
      { icon: "👁️", title: "Binocular Vision", time: "50 MYA", description: "Forward-facing eyes evolve" },
      { icon: "🐒", title: "First Monkeys", time: "40 MYA", description: "Old World monkeys appear" },
      { icon: "🦧", title: "First Apes", time: "25 MYA", description: "Tailless apes diverge" },
      { icon: "🧠", title: "Brain Expansion", time: "20 MYA", description: "Cognitive abilities increase" }
    ]
  },
  {
    id: "hominids",
    era: "hominids",
    icon: "🚶",
    title: "Human Ancestors",
    time: "6 Million Years Ago",
    timeValue: 6000000,
    description: "Our lineage splits from chimps. Hominins evolve bipedalism, larger brains, and eventually tool use.",
    highlight: "The Human Story",
    color: "#d35400",
    details: `The human lineage (hominins) split from chimps around 6-7 million years ago in Africa. Early hominins like Sahelanthropus and Ardipithecus were still quite ape-like. Australopithecines (4-2 MYA) walked upright but had small brains. The genus Homo appeared around 2.8 MYA with larger brains and tool use.`,
    funFact: "We can trace your maternal lineage back to 'Mitochondrial Eve' who lived about 200,000 years ago.",
    subEvents: [
      { icon: "🦍", title: "Chimp-Human Split", time: "6-7 MYA", description: "Our lineage diverges" },
      { icon: "🦶", title: "Bipedalism", time: "6 MYA", description: "Walking upright begins" },
      { icon: "🦴", title: "Australopithecus", time: "4 MYA", description: "Lucy and her kin" },
      { icon: "🪨", title: "First Tools", time: "3.3 MYA", description: "Stone tools appear" },
      { icon: "🧬", title: "Genus Homo", time: "2.8 MYA", description: "Our genus emerges" }
    ]
  },
  {
    id: "humans",
    era: "humans",
    icon: "👤",
    title: "Rise of Homo Sapiens",
    time: "300,000 Years Ago",
    timeValue: 300000,
    description: "Modern humans evolve in Africa. We develop language, art, and culture, eventually spreading across the globe.",
    highlight: "We Are Here",
    color: "#bf00ff",
    details: `Homo sapiens evolved in Africa around 300,000 years ago. We weren't alone—Neanderthals, Denisovans, and other human species coexisted. Modern behavior (art, music, complex tools) emerged around 100,000-50,000 years ago. We migrated out of Africa around 70,000 years ago, eventually reaching every continent.`,
    funFact: "Every human alive today shares common ancestors who lived just 3,000-5,000 years ago.",
    timePerspective: "Modern humans have existed for 0.007% of Earth's history.",
    subEvents: [
      { icon: "🌍", title: "First Homo Sapiens", time: "300,000 YA", description: "Modern humans in Africa" },
      { icon: "🗣️", title: "Complex Language", time: "100,000 YA", description: "Symbolic communication" },
      { icon: "🎨", title: "Cave Art", time: "45,000 YA", description: "Artistic expression emerges" },
      { icon: "🌏", title: "Out of Africa", time: "70,000 YA", description: "Global migration begins" },
      { icon: "🧬", title: "Neanderthal Mixing", time: "60,000 YA", description: "Interbreeding with cousins" }
    ]
  },
  {
    id: "modern",
    era: "modern",
    icon: "🌐",
    title: "Human Civilization",
    time: "12,000 Years Ago",
    timeValue: 12000,
    description: "Agriculture begins. Cities rise, writing invented, and in a cosmic instant, we reach for the stars.",
    highlight: "Civilization",
    color: "#00f5ff",
    details: `The Agricultural Revolution (12,000 years ago) changed everything. Permanent settlements led to cities, writing, mathematics, and eventually science. In the last 500 years, we've unlocked the atom, deciphered DNA, landed on the Moon, and sent probes beyond the solar system. The pace of change is accelerating exponentially.`,
    funFact: "More scientific knowledge has been generated in your lifetime than in all previous human history combined.",
    timePerspective: "Written history covers only 0.04% of human existence.",
    subEvents: [
      { icon: "🌾", title: "Agriculture", time: "12,000 YA", description: "Farming transforms society" },
      { icon: "🏛️", title: "First Cities", time: "6,000 YA", description: "Urban civilization begins" },
      { icon: "📜", title: "Writing Invented", time: "5,000 YA", description: "Knowledge preserved" },
      { icon: "🔬", title: "Scientific Revolution", time: "500 YA", description: "Understanding nature" },
      { icon: "🚀", title: "Space Age", time: "65 years ago", description: "We reach beyond Earth" }
    ]
  }
];

// Utility function to format large numbers
export const formatYearsAgo = (years: number): string => {
  if (years >= 1000000000) {
    return `${(years / 1000000000).toFixed(1)} Billion Years Ago`;
  } else if (years >= 1000000) {
    return `${(years / 1000000).toFixed(0)} Million Years Ago`;
  } else if (years >= 1000) {
    return `${(years / 1000).toFixed(0)},000 Years Ago`;
  }
  return `${years} Years Ago`;
};
