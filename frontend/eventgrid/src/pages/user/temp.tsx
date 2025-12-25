// // // --- SHOWCASE SECTIONS (Used when no filters active) ---

// // export const VenueShowcase = ({ services }: { services: any[] }) => {
// //   if (services.length === 0) return null;
// //   return (
// //     <section className="py-16">
// //       <div className="flex items-end justify-between mb-8 px-4">
// //         <div>
// //           <h3 className="font-serif text-3xl md:text-4xl text-stone-900">
// //             Premier Venues
// //           </h3>
// //           <p className="text-stone-500 mt-2">
// //             The foundation of a perfect event.
// //           </p>
// //         </div>
// //         <button className="hidden md:flex items-center gap-2 text-orange-600 font-bold hover:gap-3 transition-all">
// //           View All <ArrowRight size={16} />
// //         </button>
// //       </div>
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
// //         {services.slice(0, 3).map((service) => (
// //           <ServiceCard key={service.id} service={service} />
// //         ))}
// //       </div>
// //     </section>
// //   );
// // };

// // export const CreativeShowcase = ({ services }: { services: any[] }) => {
// //   if (services.length === 0) return null;
// //   return (
// //     <section className="py-16 bg-stone-900 text-white rounded-3xl my-8 mx-4 px-6 md:px-12 relative overflow-hidden">
// //       <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 blur-3xl rounded-full" />
// //       <div className="relative z-10">
// //         <div className="text-center mb-12">
// //           <h3 className="font-serif text-3xl md:text-4xl mb-4">
// //             Creative Minds
// //           </h3>
// //           <p className="text-stone-400 max-w-xl mx-auto">
// //             Photographers, Musicians, and Entertainers who add the soul to your
// //             celebration.
// //           </p>
// //         </div>
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //           {services.map((service) => (
// //             <div
// //               key={service.id}
// //               className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer group"
// //             >
// //               <img
// //                 src={service.image}
// //                 className="w-full h-40 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform"
// //                 alt={service.title}
// //               />
// //               <h4 className="font-bold text-lg text-white">{service.title}</h4>

// //               {service.description && (
// //                 <p className="text-sm text-stone-300 mt-2 line-clamp-2">
// //                   {service.description}
// //                 </p>
// //               )}

// //               <div className="flex justify-between mt-4 text-sm">
// //                 <span className="text-white font-semibold">
// //                   ${service.price}
// //                 </span>
// //                 <span className="flex items-center gap-1 text-orange-400">
// //                   <Star size={12} className="fill-current" /> {service.rating}
// //                 </span>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };



// <VenueShowcase services={apiServices.filter((s) => s.serviceType === "venue")} />

//               <CreativeShowcase
//                 services={apiServices.filter(
//                   (s) => s.serviceType === "photoAndVideo"  /*|| s.serviceType === ""*/
//                 )}
//               />