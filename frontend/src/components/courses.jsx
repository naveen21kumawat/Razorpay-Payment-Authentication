

import axios from "axios";
import { useEffect, useState } from "react";

const courses = [
  {
    title: "React Course",
    description: "Master React with 52 hours of comprehensive content, hands-on projects, and complete source code access",
    price: "1",
    originalPrice: "199",
    rating: 4.8,
    students: "12,450",
    duration: "52 hours",
    level: "Beginner to Advanced",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    tags: ["Frontend", "JavaScript", "UI/UX"]
  },
  {
    title: "Node.js Course",
    description: "Build scalable backend applications with 52 hours of Node.js content, real-world projects, and source code",
    price: "2",
    originalPrice: "249",
    rating: 4.9,
    students: "8,320",
    duration: "52 hours",
    level: "Intermediate",
    image: "https://nodejs.org/static/images/logo.svg",
    tags: ["Backend", "JavaScript", "API"]
  },
  {
    title: "MERN Stack Course",
    description: "Complete full-stack development course covering MongoDB, Express, React, and Node.js with industry projects",
    price: "300",
    originalPrice: "599",
    rating: 4.9,
    students: "15,680",
    duration: "80 hours",
    level: "Advanced",
    image: "https://miro.medium.com/v2/resize:fit:750/1*b7zSnFs9vJhFXhZgkvlxZA.png",
    tags: ["Full Stack", "MongoDB", "React"]
  },
  {
    title: "MongoDB Course",
    description: "Master database design and management with MongoDB through 50+ hours of content and real-world projects",
    price: "400",
    originalPrice: "399",
    rating: 4.7,
    students: "6,890",
    duration: "50 hours",
    level: "Beginner to Intermediate",
    image: "https://webimages.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png",
    tags: ["Database", "NoSQL", "Backend"]
  },
];

const CourseCard = ({ title, description, price, originalPrice, rating, students, duration, level, image, tags, onPayment }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      await onPayment(price, title);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="group bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-slate-700 hover:border-purple-500/50">
      {/* Image Container */}
      <div className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-6 h-48 flex justify-center items-center overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <img 
          src={image} 
          alt={title} 
          className="h-20 w-20 object-contain filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10" 
        />
        <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold">
          ⭐ {rating}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30">
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-2 group-hover:text-purple-300 transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* Course Info */}
        <div className="space-y-2 mb-4 text-xs text-slate-400">
          <div className="flex justify-between">
            <span>👥 {students} students</span>
            <span>⏱️ {duration}</span>
          </div>
          <div className="text-center">
            <span className="bg-slate-700 px-2 py-1 rounded-full">📚 {level}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-green-400">₹{price}</span>
            <span className="text-slate-500 line-through ml-2 text-sm">₹{originalPrice}</span>
          </div>
          <div className="text-green-400 text-sm font-semibold">
            {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
          </div>
        </div>

        {/* Buy Button */}
        <button
          onClick={handlePayment}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/25"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <span>🛒 Enroll Now</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

const Courses = () => {
  useEffect(() => {
    const loadScript = (src) =>
      new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });

    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  const onPayment = async (price, itemName) => {
    try {
      const numericPrice = Number(price);
      const options = {
        courseId: 1,
        amount: numericPrice,
      };

      const res = await axios.post("http://localhost:4000/api/createOrder", options);
      const data = res.data;

      const paymentObject = new window.Razorpay({
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        order_id: data.id,
        amount: data.amount,
        currency: data.currency,
        name: itemName,
        description: "Course Purchase",
        handler: function (response) {
          const verificationData = {
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          };

          axios.post("http://localhost:4000/api/verifyPayment", verificationData).then((res) => {
            if (res.data.success) {
              alert("✅ Payment Successful! Welcome to the course!");
            } else {
              alert("❌ Payment Verification Failed. Please try again.");
            }
          });
        },
        theme: {
          color: "#8b5cf6",
        },
      });

      paymentObject.open();
    } catch (error) {
      console.error("Payment error:", error.response?.data || error.message);
      alert("❌ Payment failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 w-full">
      {/* Header Section */}
      <div className="relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
        <div className="relative py-8 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-slate-400 mb-6 pl-3">
            <span className="hover:text-white transition-colors cursor-pointer">🏠 Home</span>
            <span>›</span>
            <span className="hover:text-white transition-colors cursor-pointer">📚 Courses</span>
            <span>›</span>
            <span className="text-purple-400 font-semibold">💻 Computer Science</span>
          </nav>

          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent px-2">
              Premium Courses
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto px-3">
              Master cutting-edge technologies with our comprehensive courses designed by industry experts
            </p>
            <div className="mt-4 flex justify-center items-center space-x-4 md:space-x-6 text-xs md:text-sm text-slate-400 flex-wrap px-2">
              <div className="flex items-center">
                <span className="text-green-400 mr-1">✓</span>
                Lifetime Access
              </div>
              <div className="flex items-center">
                <span className="text-green-400 mr-1">✓</span>
                Certificate of Completion
              </div>
              <div className="flex items-center">
                <span className="text-green-400 mr-1">✓</span>
                24/7 Support
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="pb-12 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-4 px-2 md:px-3">
          {courses.map((course, index) => (
            <CourseCard key={index} onPayment={onPayment} {...course} />
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-12 mx-2 md:mx-3 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 border border-slate-600/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-1 md:mb-2">50K+</div>
              <div className="text-slate-300 text-xs md:text-sm">Happy Students</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1 md:mb-2">200+</div>
              <div className="text-slate-300 text-xs md:text-sm">Hours of Content</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-green-400 mb-1 md:mb-2">4.8★</div>
              <div className="text-slate-300 text-xs md:text-sm">Average Rating</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1 md:mb-2">100%</div>
              <div className="text-slate-300 text-xs md:text-sm">Money Back Guarantee</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;

