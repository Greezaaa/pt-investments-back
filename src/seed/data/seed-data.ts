interface Images {
    url: string;
}

interface SeedProject {
  title: string;
  company_name: string;
  desired_goal: number;
  language: string;
  location: string;
  description: string;
  images: string[]; 
}


  interface SeedData {
    projects: SeedProject[];
  }


  
  export const seedData: SeedData = {
    projects: [
      {
        title: "E-commerce Platform",
        company_name: "ABC Corporation",
        desired_goal: 500000,
        language: "JavaScript",
        location: "New York",
        description: "Develop an online marketplace for buying and selling various products.",
        images: ["https://picsum.photos/800/600", "https://picsum.photos/800/600"]
      },
      {
        title: "Mobile Banking App",
        company_name: "XYZ Bank",
        desired_goal: 250000,
        language: "Java",
        location: "London",
        description: "Create a mobile application for easy and secure banking transactions.",
        images: ["https://picsum.photos/800/600", "https://picsum.photos/800/600"]
      },
      {
        title: "Social Media Platform",
        company_name: "PQR Technologies",
        desired_goal: 1000000,
        language: "Python",
        location: "San Francisco",
        description: "Build a social networking platform with advanced features and user-friendly interface.",
        images: ["https://picsum.photos/800/600", "https://picsum.photos/800/600"]
      },
      {
        title: "Smart Home Automation",
        company_name: "DEF Innovations",
        desired_goal: 400000,
        language: "C#",
        location: "Tokyo",
        description: "Design an automated system to control various home devices and enhance convenience.",
        images: ["https://picsum.photos/800/600", "https://picsum.photos/800/600"]
      },
      {
        title: "Online Learning Platform",
        company_name: "GHI Education",
        desired_goal: 800000,
        language: "Ruby",
        location: "Berlin",
        description: "Develop a web-based platform to provide online courses and educational resources.",
        images: ["https://picsum.photos/800/600", "https://picsum.photos/800/600"]
      },
      {
        title: "AI-powered Chatbot",
        company_name: "XYZ Solutions",
        desired_goal: 300000,
        language: "Python",
        location: "San Francisco",
        description: "Build an intelligent chatbot using natural language processing and machine learning algorithms.",
        images: ["https://picsum.photos/800/600", "https://picsum.photos/800/600"]
      },
      {
        title: "Eco-Friendly Transportation",
        company_name: "GreenMobility",
        desired_goal: 500000,
        language: "JavaScript",
        location: "Copenhagen",
        description: "Develop an electric vehicle sharing platform to promote sustainable transportation options.",
        images: ["https://picsum.photos/800/600", "https://picsum.photos/800/600"]
      },
      {
        title: "Health Monitoring Wearable",
        company_name: "VitaTech",
        desired_goal: 200000,
        language: "Java",
        location: "Tokyo",
        description: "Design a wearable device that tracks and analyzes health data for personalized wellness insights.",
        images: ["https://picsum.photos/800/600", "https://picsum.photos/800/600"]
      },
      {
        title: "Food Delivery App",
        company_name: "Foodify",
        desired_goal: 150000,
        language: "Swift",
        location: "New York",
        description: "Create a mobile application that enables users to order food from local restaurants for delivery.",
        images: ["https://picsum.photos/800/600", "https://picsum.photos/800/600"]
      },
      {
        title: "Virtual Reality Gaming",
        company_name: "Immersive Entertainment",
        desired_goal: 400000,
        language: "C#",
        location: "Los Angeles",
        description: "Develop immersive virtual reality games with realistic graphics and interactive gameplay.",
        images: ["https://picsum.photos/800/600", "https://picsum.photos/800/600"]
      },
      {
        title: "Sustainable Energy Solutions",
        company_name: "RenewPower",
        desired_goal: 600000,
        language: "Python",
        location: "Mumbai",
        description: "Develop renewable energy projects to reduce carbon emissions and promote a greener future.",
        images: ["https://picsum.photos/800/600", "https://picsum.photos/800/600"]
      }
      
    ]
  };
