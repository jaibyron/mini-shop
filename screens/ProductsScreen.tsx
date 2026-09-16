import { StyleSheet, View, FlatList } from "react-native";
import { ProductCard } from "../components/ProductCard";
import { addItem } from "../store/cartSlice";
import { useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

const data = [
  { id: "1", description: "MacBook Pro M4 14-inch", price: 2099.99 },
  { id: "2", description: "Greggs Sausage Roll", price: 1.99 },
  { id: "3", description: "Walkers Ready Salted Crisps", price: 0.75 },
  { id: "4", description: "Ray-Ban Wayfarer Sunglasses", price: 172.75 },
  { id: "5", description: "iPhone 16 Pro 256GB", price: 1199.0 },
  { id: "6", description: "Samsung Galaxy S25", price: 899.0 },
  { id: "7", description: "Sony WH-1000XM6 Headphones", price: 399.99 },
  { id: "8", description: "Apple AirPods Pro (2nd Gen)", price: 229.0 },
  { id: "9", description: "Nintendo Switch OLED", price: 309.99 },
  { id: "10", description: "PlayStation 5 Slim Console", price: 479.99 },
  { id: "11", description: "Xbox Series X", price: 479.99 },
  { id: "12", description: "Dell 27-inch 4K Monitor", price: 349.99 },
  { id: "13", description: "Logitech MX Master 3S Mouse", price: 99.99 },
  { id: "14", description: "Mechanical Gaming Keyboard", price: 129.99 },
  { id: "15", description: "USB-C Charging Cable", price: 12.99 },
  { id: "16", description: "Anker 20,000mAh Power Bank", price: 49.99 },
  { id: "17", description: "Kindle Paperwhite", price: 159.99 },
  { id: "18", description: "Ninja Air Fryer", price: 149.99 },
  { id: "19", description: "Dyson V15 Vacuum Cleaner", price: 649.99 },
  { id: "20", description: "Kettle", price: 34.99 },
  { id: "21", description: "Toaster", price: 29.99 },
  { id: "22", description: "Heinz Baked Beans (415g)", price: 1.4 },
  { id: "23", description: "Warburtons Medium Bread", price: 1.45 },
  { id: "24", description: "Semi-Skimmed Milk (2L)", price: 1.75 },
  { id: "25", description: "Free Range Eggs (12 Pack)", price: 3.2 },
  { id: "26", description: "Cathedral City Cheddar 350g", price: 4.5 },
  { id: "27", description: "Lurpak Butter 500g", price: 4.95 },
  { id: "28", description: "Coca-Cola 2L", price: 2.35 },
  { id: "29", description: "Yorkshire Tea (80 Bags)", price: 4.25 },
  { id: "30", description: "Nescafé Gold Coffee", price: 6.99 },
  { id: "31", description: "Levi's 501 Jeans", price: 89.99 },
  { id: "32", description: "Nike Air Force 1 Trainers", price: 109.99 },
  { id: "33", description: "Adidas Hoodie", price: 54.99 },
  { id: "34", description: "Cotton Crew Neck T-Shirt", price: 14.99 },
  { id: "35", description: "Winter Beanie Hat", price: 18.99 },
  { id: "36", description: "Leather Wallet", price: 39.99 },
  { id: "37", description: "Backpack", price: 49.99 },
  { id: "38", description: "Reusable Water Bottle", price: 19.99 },
  { id: "39", description: "Bic Ballpoint Pens (10 Pack)", price: 3.99 },
  { id: "40", description: "A4 Notebook", price: 2.99 },
  { id: "41", description: "LED Desk Lamp", price: 27.99 },
  { id: "42", description: "Wireless Phone Charger", price: 24.99 },
  { id: "43", description: "HDMI Cable (2m)", price: 9.99 },
  { id: "44", description: "Bluetooth Speaker", price: 79.99 },
  { id: "45", description: "Electric Toothbrush", price: 59.99 },
  { id: "46", description: "Shampoo (400ml)", price: 3.99 },
  { id: "47", description: "Shower Gel", price: 2.5 },
  { id: "48", description: "Kitchen Roll (4 Pack)", price: 5.49 },
  { id: "49", description: "Fairy Washing Up Liquid", price: 2.99 },
  { id: "50", description: "Laundry Detergent (40 Washes)", price: 8.99 },
];

const avengersData = [
  {
    id: "1",
    name: "Infinity Gauntlet",
    productDescription:
      "A powerful golden gauntlet designed to hold all six Infinity Stones. Wielded by Thanos in his quest to control the universe.",
    price: 999.99,
  },
  {
    id: "2",
    name: "Nano Gauntlet",
    productDescription:
      "An advanced gauntlet created using Iron Man's nanotechnology. Designed to channel the combined power of the six Infinity Stones.",
    price: 899.99,
  },
  {
    id: "3",
    name: "Tesseract",
    productDescription:
      "A mysterious blue cosmic cube containing the Space Stone. It has been sought after by powerful forces throughout the Marvel universe.",
    price: 499.99,
  },
  {
    id: "4",
    name: "Mind Stone",
    productDescription:
      "A powerful yellow Infinity Stone associated with consciousness, intelligence, and extraordinary mental abilities.",
    price: 399.99,
  },
  {
    id: "5",
    name: "Time Stone",
    productDescription:
      "A mystical green Infinity Stone capable of manipulating and controlling the flow of time.",
    price: 399.99,
  },
  {
    id: "6",
    name: "Space Stone",
    productDescription:
      "A blue Infinity Stone capable of manipulating space and enabling incredible forms of transportation across vast distances.",
    price: 399.99,
  },
  {
    id: "7",
    name: "Reality Stone",
    productDescription:
      "A powerful red Infinity Stone with the ability to alter matter and reshape reality itself.",
    price: 399.99,
  },
  {
    id: "8",
    name: "Power Stone",
    productDescription:
      "A purple Infinity Stone containing immense destructive energy and capable of generating incredible levels of power.",
    price: 399.99,
  },
  {
    id: "9",
    name: "Soul Stone",
    productDescription:
      "A mysterious orange Infinity Stone connected to the essence of life and the souls of living beings.",
    price: 399.99,
  },
  {
    id: "10",
    name: "Stormbreaker",
    productDescription:
      "A legendary enchanted battle axe forged for Thor. Stormbreaker is capable of channeling immense power and summoning the Bifrost.",
    price: 749.99,
  },
  {
    id: "11",
    name: "Mjolnir",
    productDescription:
      "Thor's legendary enchanted hammer. Known for its immense power and its ability to return to its worthy wielder when summoned.",
    price: 599.99,
  },
  {
    id: "12",
    name: "Captain America's Shield",
    productDescription:
      "An iconic circular shield made from the incredibly durable metal vibranium. Used by Captain America as both a defensive and offensive weapon.",
    price: 499.99,
  },
  {
    id: "13",
    name: "Iron Man Mark 50 Armor",
    productDescription:
      "An advanced Iron Man suit powered by nanotechnology. The Mark 50 can rapidly form weapons, defensive systems, and other equipment around its wearer.",
    price: 1299.99,
  },
  {
    id: "14",
    name: "Iron Man Mark 85 Armor",
    productDescription:
      "Tony Stark's advanced Mark 85 armor from Avengers: Endgame. It combines sophisticated nanotechnology with powerful weapons and defensive systems.",
    price: 1399.99,
  },
  {
    id: "15",
    name: "Arc Reactor",
    productDescription:
      "A compact and highly advanced energy source developed by Tony Stark. The technology powers Iron Man's suits and other advanced equipment.",
    price: 299.99,
  },
  {
    id: "16",
    name: "Hulkbuster Armor",
    productDescription:
      "A massive reinforced armor system created to withstand the extraordinary strength of the Hulk. Built with heavy-duty protection and powerful mechanical systems.",
    price: 1199.99,
  },
  {
    id: "17",
    name: "Black Panther Suit",
    productDescription:
      "An advanced vibranium suit worn by the Black Panther. It provides enhanced protection and incorporates sophisticated Wakandan technology.",
    price: 899.99,
  },
  {
    id: "18",
    name: "Ant-Man Suit",
    productDescription:
      "A highly advanced suit powered by Pym Particles. It allows the wearer to change size while maintaining remarkable strength and agility.",
    price: 699.99,
  },
  {
    id: "19",
    name: "Wasp Suit",
    productDescription:
      "An advanced superhero suit equipped with shrinking technology, wings, and energy weapons. Designed for speed, agility, and aerial combat.",
    price: 699.99,
  },
  {
    id: "20",
    name: "Spider-Man Iron Spider Suit",
    productDescription:
      "An advanced red-and-gold Spider-Man suit created using Stark technology. It features enhanced protection and mechanical spider-like appendages.",
    price: 799.99,
  },
  {
    id: "21",
    name: "Doctor Strange's Cloak of Levitation",
    productDescription:
      "A magical red cloak with a personality of its own. The Cloak of Levitation can fly independently and assist Doctor Strange during battles.",
    price: 449.99,
  },
  {
    id: "22",
    name: "Eye of Agamotto",
    productDescription:
      "A mystical artifact associated with Doctor Strange and the Masters of the Mystic Arts. It serves as a powerful tool for magical abilities.",
    price: 349.99,
  },
  {
    id: "23",
    name: "Loki's Scepter",
    productDescription:
      "A powerful weapon originally given to Loki by Thanos. The scepter contains the Mind Stone and can project powerful energy.",
    price: 299.99,
  },
  {
    id: "24",
    name: "Gungnir",
    productDescription:
      "Odin's legendary spear and one of the most powerful weapons in Asgard. It represents the authority and power of the Asgardian king.",
    price: 449.99,
  },
  {
    id: "25",
    name: "Heimdall's Sword",
    productDescription:
      "A powerful golden Asgardian sword associated with Heimdall, the guardian of the Bifrost.",
    price: 249.99,
  },
  {
    id: "26",
    name: "Hawkeye's Bow",
    productDescription:
      "A precision combat bow used by Clint Barton. Designed for accuracy and paired with a variety of specialized arrows.",
    price: 199.99,
  },
  {
    id: "27",
    name: "Black Widow's Batons",
    productDescription:
      "Compact electroshock weapons used by Natasha Romanoff. Designed for close-quarters combat and capable of delivering powerful electrical attacks.",
    price: 179.99,
  },
  {
    id: "28",
    name: "Winter Soldier's Vibranium Arm",
    productDescription:
      "A powerful cybernetic arm created for the Winter Soldier. Constructed using advanced technology and designed to provide incredible strength and durability.",
    price: 699.99,
  },
  {
    id: "29",
    name: "Star-Lord's Quad Blasters",
    productDescription:
      "A pair of futuristic energy pistols used by Star-Lord. These distinctive weapons provide multiple firing capabilities for intergalactic combat.",
    price: 249.99,
  },
  {
    id: "30",
    name: "Rocket's Quad Blasters",
    productDescription:
      "A pair of powerful futuristic blasters associated with Rocket. Compact, versatile, and designed for high-powered combat.",
    price: 229.99,
  },
  {
    id: "31",
    name: "Yondu's Yaka Arrow",
    productDescription:
      "A unique weapon controlled by Yondu's whistle. The Yaka Arrow can fly through the air, change direction, and strike targets with incredible precision.",
    price: 399.99,
  },
  {
    id: "32",
    name: "Thanos' Double-Edged Sword",
    productDescription:
      "An enormous double-edged weapon wielded by Thanos. Its size and strength make it a formidable weapon in close combat.",
    price: 549.99,
  },
  {
    id: "33",
    name: "Thanos' Armor",
    productDescription:
      "The imposing battle armor worn by Thanos. Designed for protection during combat and featuring heavy metallic plating.",
    price: 799.99,
  },
  {
    id: "34",
    name: "Chitauri Scepter",
    productDescription:
      "A futuristic alien weapon associated with the Chitauri forces. Designed to project powerful energy during combat.",
    price: 199.99,
  },
  {
    id: "35",
    name: "Chitauri Leviathan",
    productDescription:
      "A massive biomechanical flying war machine used by the Chitauri during their invasion of Earth. Designed to carry troops and destroy obstacles.",
    price: 2499.99,
  },
  {
    id: "36",
    name: "Chitauri Battle Armor",
    productDescription:
      "Futuristic alien combat armor worn by Chitauri soldiers. Designed to provide protection during large-scale intergalactic battles.",
    price: 599.99,
  },
  {
    id: "37",
    name: "Outrider Battle Armor",
    productDescription:
      "Heavy combat equipment inspired by the Outriders. Designed for aggressive battlefield encounters and protection during combat.",
    price: 449.99,
  },
  {
    id: "38",
    name: "Sakaarian Sword",
    productDescription:
      "A distinctive blade inspired by the gladiatorial weapons of Sakaar. Built for the brutal arena battles made famous by the Grandmaster.",
    price: 179.99,
  },
  {
    id: "39",
    name: "Draupnir Spear",
    productDescription:
      "A powerful Asgardian spear inspired by ancient Asgardian mythology and associated with the royal weapons of Asgard.",
    price: 399.99,
  },
  {
    id: "40",
    name: "Eternal Flame",
    productDescription:
      "A powerful mystical source of energy associated with Asgard and the realm of fire. It possesses extraordinary destructive potential.",
    price: 499.99,
  },
  {
    id: "41",
    name: "Bifrost Sword",
    productDescription:
      "A magnificent Asgardian-inspired sword representing the legendary Bifrost and the warriors who protect the realms.",
    price: 349.99,
  },
  {
    id: "42",
    name: "Vibranium Shield",
    productDescription:
      "A highly durable shield constructed from vibranium. Inspired by Wakandan technology and designed to absorb and withstand powerful impacts.",
    price: 449.99,
  },
  {
    id: "43",
    name: "Vibranium Spear",
    productDescription:
      "An advanced Wakandan weapon combining traditional spear design with the incredible properties of vibranium.",
    price: 299.99,
  },
  {
    id: "44",
    name: "Wakandan Kimoyo Beads",
    productDescription:
      "Advanced Wakandan technology worn around the wrist. Kimoyo Beads can provide communication, information, and other technological functions.",
    price: 149.99,
  },
  {
    id: "45",
    name: "Wakandan Sonic Spear",
    productDescription:
      "An advanced Wakandan weapon combining vibranium technology with sonic energy. Designed to deliver powerful energy-based attacks.",
    price: 299.99,
  },
  {
    id: "46",
    name: "Pym Particles",
    productDescription:
      "Revolutionary particles developed by Hank Pym that allow people and objects to change size while retaining their mass and strength.",
    price: 599.99,
  },
  {
    id: "47",
    name: "Quantum Tunnel",
    productDescription:
      "Advanced technology designed to provide access to the Quantum Realm. The tunnel plays a key role in enabling journeys through space and time.",
    price: 1999.99,
  },
  {
    id: "48",
    name: "Time GPS",
    productDescription:
      "A fictionalized navigation device designed to help the Avengers coordinate and track journeys through different points in time.",
    price: 249.99,
  },
  {
    id: "49",
    name: "Benatar Starship",
    productDescription:
      "The distinctive spacecraft used by the Guardians of the Galaxy. The Benatar is equipped for deep-space travel, exploration, and combat.",
    price: 4999.99,
  },
  {
    id: "50",
    name: "Avengers Compound",
    productDescription:
      "The high-tech headquarters used by the Avengers, featuring advanced laboratories, training facilities, equipment, and living quarters.",
    price: 99999.99,
  },
];

export default function ProductsScreen() {
  const dispatch = useDispatch();

  const handleBuy = ({
    id,
    name,
    price,
  }: {
    id: string;
    name: string;
    price: number;
  }) => {
    dispatch(addItem({ id, name, price }));
  };

  return (
    <SafeAreaView edges={["left", "right"]} style={styles.container}>
      <FlatList
        data={avengersData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            name={item.name}
            description={item.productDescription}
            price={item.price}
            onAddToCart={() =>
              handleBuy({
                id: item.id,
                name: item.name,
                price: item.price,
              })
            }
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgrey",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
