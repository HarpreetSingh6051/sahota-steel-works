/**
 * Services and value points for Sahota Steel Works.
 *
 * `icon` names map to lucide-react icons inside the Service / WhyChooseUs
 * components — keep them in sync if a name ever changes.
 */

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: "truck" | "scale" | "flame" | "building" | "messages";
}

export const services: Service[] = [
  {
    id: "material-supply",
    name: "Iron & Steel Material Supply",
    description:
      "MS angles, channels, flats, pipes, round bars and other iron and steel materials for construction and industrial requirements.",
    icon: "truck",
  },
  {
    id: "steel-trading",
    name: "Steel Trading",
    description:
      "Sourcing and supplying steel sections and materials to meet customer project needs.",
    icon: "scale",
  },
  {
    id: "fabrication-work",
    name: "Fabrication Work",
    description:
      "Iron and steel fabrication work based on the requirements you share with us.",
    icon: "flame",
  },
  {
    id: "structural-steel-work",
    name: "Structural Steel Work",
    description:
      "Steel structures and structural fabrication work according to customer specifications.",
    icon: "building",
  },
  {
    id: "material-enquiries",
    name: "Material Enquiries for Construction & Engineering",
    description:
      "Tell us what your construction or engineering project needs — we will help you source it.",
    icon: "messages",
  },
];

export interface WhyPoint {
  id: string;
  title: string;
  description: string;
  icon: "map" | "layers" | "clipboard" | "chat" | "phone";
}

export const whyUsPoints: WhyPoint[] = [
  {
    id: "local-contact",
    title: "Convenient Local Contact in Ludhiana",
    description:
      "Located near Khanna Dyeing on Tajpur Road — easy to reach for customers across the city.",
    icon: "map",
  },
  {
    id: "multiple-categories",
    title: "Multiple Steel Material Categories",
    description:
      "Angles, channels, flats, pipes, round bars and structural sections under one enquiry.",
    icon: "layers",
  },
  {
    id: "supply-and-fabrication",
    title: "Material Supply & Fabrication Enquiries",
    description:
      "Speak to us about both material sourcing and fabrication work for your projects.",
    icon: "clipboard",
  },
  {
    id: "direct-communication",
    title: "Direct Communication with the Business",
    description:
      "Call Rajinder Singh or Navjot Singh directly — no call centres or middlemen.",
    icon: "chat",
  },
  {
    id: "easy-enquiries",
    title: "Easy Phone & WhatsApp Enquiries",
    description:
      "Send your requirement by phone or WhatsApp and get a practical response.",
    icon: "phone",
  },
];

/** Generic service enquiry message shown in the WhatsApp prefilled text. */
export function serviceEnquiryMessage(service: Service): string {
  return `Hello Sahota Steel Works! I would like to enquire about ${service.name}.`;
}