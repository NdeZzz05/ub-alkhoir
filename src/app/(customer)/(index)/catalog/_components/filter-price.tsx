// "use client";

// import { DialogTitle } from "@/components/ui/dialog";
// import { useFilter } from "@/hooks/useFilter";
// import { useEffect, useState } from "react";
// import { NumericFormat } from "react-number-format";

// export default function FilterPrice() {
//   const { filter, setFilter } = useFilter();
//   const [minPrice, setMinPrice] = useState<string>("");
//   const [maxPrice, setMaxPrice] = useState<string>("");

//   useEffect(() => {
//     const debounceInput = setTimeout(() => {
//       const cleanPrice = minPrice.replace(/\./g, "");
//       setFilter({
//         minPrice: Number.parseInt(cleanPrice),
//       });
//     }, 1500);
//     return () => clearTimeout(debounceInput);
//   }, [minPrice]);

//   useEffect(() => {
//     const debounceInput = setTimeout(() => {
//       const cleanPrice = maxPrice.replace(/\./g, "");
//       setFilter({
//         maxPrice: Number.parseInt(cleanPrice),
//       });
//     }, 1500);

//     return () => clearTimeout(debounceInput);
//   }, [maxPrice]);

//   return (
//     <>
//       <DialogTitle className="text-sm">Rentang Harga</DialogTitle>
//       <div className="flex gap-2 justify-center items-center">
//         <NumericFormat
//           id="minPrice"
//           name="minPrice"
//           thousandSeparator="."
//           decimalSeparator=","
//           decimalScale={0}
//           allowNegative={false}
//           className="border border-gray-300 rounded-md p-2 w-40"
//           placeholder="harga minimal"
//           onChange={(e) => setMinPrice(e.target.value)}
//           value={filter.minPrice}
//         />
//         <hr className="w-2 border-black" />
//         <NumericFormat
//           id="maxPrice"
//           name="maxPrice"
//           thousandSeparator="."
//           decimalSeparator=","
//           decimalScale={0}
//           allowNegative={false}
//           className="border border-gray-300 rounded-md p-2 w-40"
//           placeholder="harga maksimal"
//           onChange={(e) => setMaxPrice(e.target.value)}
//           value={filter.maxPrice}
//         />
//       </div>
//     </>
//   );
// }

/**========================================================== */

/**========================================================== */

/**========================================================== */

// "use client";

// import { DialogTitle } from "@/components/ui/dialog";
// import { useFilter } from "@/hooks/useFilter";
// import { useEffect, useState } from "react";
// import { NumericFormat } from "react-number-format";
// import { useSearchParams, useRouter } from "next/navigation";

// export default function FilterPrice() {
//   const { filter, setFilter } = useFilter();
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const [minPrice, setMinPrice] = useState<string>("");
//   const [maxPrice, setMaxPrice] = useState<string>("");

//   // Sync from URL on mount
//   useEffect(() => {
//     const urlMin = searchParams.get("minPrice");
//     const urlMax = searchParams.get("maxPrice");

//     if (urlMin) {
//       setMinPrice(formatThousandSeparator(urlMin));
//       setFilter({ ...filter, minPrice: parseInt(urlMin) });
//     }

//     if (urlMax) {
//       setMaxPrice(formatThousandSeparator(urlMax));
//       setFilter({ ...filter, maxPrice: parseInt(urlMax) });
//     }
//   }, [searchParams, setFilter]);

//   // Update URL and state filter when minPrice changes
//   useEffect(() => {
//     const debounce = setTimeout(() => {
//       const clean = minPrice.replace(/\./g, "");
//       const price = parseInt(clean || "0");

//       setFilter({ ...filter, minPrice: price });

//       const params = new URLSearchParams(searchParams.toString());
//       if (clean) {
//         params.set("minPrice", price.toString());
//       } else {
//         params.delete("minPrice");
//       }

//       router.push(`/catalog?${params.toString()}`, { scroll: false });
//     }, 800);

//     return () => clearTimeout(debounce);
//   }, [minPrice]);

//   useEffect(() => {
//     const debounce = setTimeout(() => {
//       const clean = maxPrice.replace(/\./g, "");
//       const price = parseInt(clean || "0");

//       setFilter({ ...filter, maxPrice: price });

//       const params = new URLSearchParams(searchParams.toString());
//       if (clean) {
//         params.set("maxPrice", price.toString());
//       } else {
//         params.delete("maxPrice");
//       }

//       router.push(`/catalog?${params.toString()}`, { scroll: false });
//     }, 800);

//     return () => clearTimeout(debounce);
//   }, [maxPrice]);

//   return (
//     <>
//       <DialogTitle className="text-sm">Rentang Harga</DialogTitle>
//       <div className="flex gap-2 justify-center items-center">
//         <NumericFormat
//           id="minPrice"
//           name="minPrice"
//           thousandSeparator="."
//           decimalSeparator=","
//           decimalScale={0}
//           allowNegative={false}
//           className="border border-gray-300 rounded-md p-2 w-40"
//           placeholder="Harga minimal"
//           onChange={(e) => setMinPrice(e.target.value)}
//           value={minPrice}
//         />
//         <hr className="w-2 border-black" />
//         <NumericFormat
//           id="maxPrice"
//           name="maxPrice"
//           thousandSeparator="."
//           decimalSeparator=","
//           decimalScale={0}
//           allowNegative={false}
//           className="border border-gray-300 rounded-md p-2 w-40"
//           placeholder="Harga maksimal"
//           onChange={(e) => setMaxPrice(e.target.value)}
//           value={maxPrice}
//         />
//       </div>
//     </>
//   );
// }

// function formatThousandSeparator(value: string | number) {
//   if (!value) return "";
//   const number = typeof value === "string" ? parseInt(value) : value;
//   return number.toLocaleString("id-ID"); // Format 10000 => "10.000"
// }
