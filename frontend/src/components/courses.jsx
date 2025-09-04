// import axios from "axios";
// import { useEffect } from "react";

// const courses = [
//   {
//     title: "React Course",
//     description:
//       "This is a react course, 52 hours of exclusive content+ projects with src codes",
//     price: "100",
//     image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
//   },
//   {
//     title: "Node Course",
//     description:
//       "This is a node course, 52 hours of exclusive content+ projects with src codes",
//     price: "$200",
//     image: "https://nodejs.org/static/images/logo.svg",
//   },
//   {
//     title: "MERN Course",
//     description:
//       "This is a mern course, 52 hours of exclusive content+ projects with src codes",
//     price: "$300",
//     image:
//       "https://miro.medium.com/v2/resize:fit:750/1*b7zSnFs9vJhFXhZgkvlxZA.png",
//   },
//   {
//     title: "MongoDB Course",
//     description:
//       "This is a mongodb course, 52 hours of exclusive content+ projects with src codes",
//     price: "$400",
//     image:
//       "https://webimages.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png",
//   },
// ];

// const CourseCard = ({ title, description, price, image ,onPayment }) => (
//   <div className="bg-slate-900 text-white p-4 rounded-xl w-64 shadow-md">
//     <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-md flex justify-center items-center h-32">
//       <img src={image} alt={title} className="h-full object-contain" />
//     </div>
//     <h3 className="text-xl font-bold mt-4">{title}</h3>
//     <p className="text-sm mt-2">{description}</p>
//     <p className="mt-2 font-bold">
//       Price: <span className="text-white">{price}</span>
//     </p>
//     <button onClick={()=>onPayment(price,title)} className="mt-4 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-md">
//       Buy Now
//     </button>
//   </div>
// );

// const Courses = () => {
//   const loadScript = (src) => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = src;
//       script.onload = () => {
//         resolve(true);
//       };
//       script.onerror=()=>{
//         resolve(false)
//       }
//       document.body.appendChild(script)
//     });
//   };

//   const onPayment = async (price , itemName)=>{
//     try{
//      const options={
//       courseID : 1,
//       amount : price
//      }
//      const res =await axios.post('http://localhost:4000/api/createOrder',options)
//      console.log(res)

//      const data = res.data;

//      console.log(data)

//      const paymentObject = new (window).Razorpay({
//       key :'rzp_test_gWqq3BZQw957fl',
//       order_id : data.id,
//       ...data,
//       handler : function(response){
//         const options2 = {
//           order_id  : response.razorpay.order_id,
//           payment_id : response.razorpay.payment_id,
//           signature : response.razorpay.signature


//         }
//         axios.post("http://localhost:4000/api/verifyPayment",options2).then((res)=>{
//           if(res.data.suceess){
//             alert("payment Successfull")
//           }else{
//             alert("Payment Failed")
//           }
//         })
//       }


//      })
//      paymentObject.open();
//     }catch(error){
//       console.log(  " somethis Wrong",error)
//     }

//   }

//   useEffect(()=>{
//     loadScript('https://checkout.razorpay.com/v1/checkout.js')
//   },[])
//   return (
//     <div className="bg-black min-h-screen px-10 py-8 text-white">
//       <h2 className="text-xl text-gray-400 mb-6">
//         Home &gt; Courses &gt; Computer Science
//       </h2>
//       <div className="flex flex-wrap gap-8 justify-start">
//         {courses.map((course, index) => (
//           <CourseCard key={index} onPayment={onPayment} {...course} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Courses;

import axios from "axios";
import { useEffect } from "react";

const courses = [
  {
    title: "React Course",
    description: "52 hours of React content + projects with source code",
    price: "1",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  },
  {
    title: "Node Course",
    description: "52 hours of Node.js content + projects with source code",
    price: "2",
    image: "https://nodejs.org/static/images/logo.svg",
  },
  {
    title: "MERN Course",
    description: "Full MERN stack course with projects and source code",
    price: "300",
    image: "https://miro.medium.com/v2/resize:fit:750/1*b7zSnFs9vJhFXhZgkvlxZA.png",
  },
  {
    title: "MongoDB Course",
    description: "Learn MongoDB with 50+ hours of content and real projects",
    price: "400",
    image: "https://webimages.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png",
  },
];

const CourseCard = ({ title, description, price, image, onPayment }) => (
  <div className="bg-slate-900 text-white p-4 rounded-xl w-64 shadow-md">
    <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-md flex justify-center items-center h-32">
      <img src={image} alt={title} className="h-full object-contain" />
    </div>
    <h3 className="text-xl font-bold mt-4">{title}</h3>
    <p className="text-sm mt-2">{description}</p>
    <p className="mt-2 font-bold">Price: ₹{price}</p>
    <button
      onClick={() => onPayment(price, title)}
      className="mt-4 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-md"
    >
      Buy Now
    </button>
  </div>
);

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
      const numericPrice = Number(price); // ₹
      const options = {
        courseId: 1, // dummy static ID, update if dynamic
        amount: numericPrice,
      };

      const res = await axios.post("http://localhost:4000/api/createOrder", options);
      const data = res.data;

      const paymentObject = new window.Razorpay({
        key: "rzp_test_gWqq3BZQw957fl", //test
        // key: "rzp_live_GxKYyRtqz1wuuS", //live
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
              alert("✅ Payment Successful");
            } else {
              alert("❌ Payment Verification Failed");
            }
          });
        },
        theme: {
          color: "#6366f1",
        },
      });

      paymentObject.open();
    } catch (error) {
      console.error("Something went wrong:", error.response?.data || error.message);
    }
  };

  return (
    <div className="bg-black min-h-screen px-10 py-8 text-white">
      <h2 className="text-xl text-gray-400 mb-6">
        Home &gt; Courses &gt; Computer Science
      </h2>
      <div className="flex flex-wrap gap-8 justify-start">
        {courses.map((course, index) => (
          <CourseCard key={index} onPayment={onPayment} {...course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;

