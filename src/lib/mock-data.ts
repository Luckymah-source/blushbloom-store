import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

export type Product = {
  id: string;
  slug: string;
  title: string;
  brand: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  sold: number;
  image: string;
  badge?: string;
};

export const formatToman = (n: number) =>
  new Intl.NumberFormat("fa-IR").format(n) + " تومان";

export const PRODUCTS: Product[] = [
  { id: "1", slug: "pink-rose-cream", title: "کرم آبرسان رز صورتی", brand: "گل‌سا", category: "مراقبت از پوست", price: 580000, oldPrice: 720000, rating: 4.8, reviews: 124, sold: 980, image: product1, badge: "پرفروش" },
  { id: "2", slug: "matte-lipstick-velvet", title: "رژ لب مات ولوت", brand: "لومیه", category: "آرایش لب", price: 320000, oldPrice: 390000, rating: 4.7, reviews: 89, sold: 1250, image: product2, badge: "تخفیف" },
  { id: "3", slug: "rose-perfume", title: "عطر زنانه رز فرنچ", brand: "پاریس بل", category: "عطر و ادکلن", price: 1450000, rating: 4.9, reviews: 56, sold: 420, image: product3, badge: "ویژه" },
  { id: "4", slug: "vitamin-c-serum", title: "سرم ویتامین C درخشان‌کننده", brand: "اسکین لب", category: "مراقبت از پوست", price: 690000, oldPrice: 850000, rating: 4.8, reviews: 210, sold: 1820, image: product4, badge: "جدید" },
  { id: "5", slug: "blush-palette", title: "پالت رژ گونه شش‌رنگ", brand: "لومیه", category: "آرایش صورت", price: 540000, rating: 4.6, reviews: 73, sold: 640, image: product5 },
  { id: "6", slug: "body-mist-pink", title: "بادی اسپلش صورتی", brand: "گل‌سا", category: "عطر و ادکلن", price: 280000, oldPrice: 350000, rating: 4.5, reviews: 142, sold: 2100, image: product6, badge: "تخفیف" },
  { id: "7", slug: "night-cream", title: "کرم شب ترمیم‌کننده", brand: "اسکین لب", category: "مراقبت از پوست", price: 820000, rating: 4.7, reviews: 64, sold: 510, image: product1 },
  { id: "8", slug: "lip-tint", title: "تینت لب آبرسان", brand: "گل‌سا", category: "آرایش لب", price: 195000, oldPrice: 240000, rating: 4.4, reviews: 95, sold: 1430, image: product2, badge: "تخفیف" },
];

export const CATEGORIES = [
  { slug: "skincare", title: "مراقبت از پوست", icon: "✿" },
  { slug: "makeup", title: "آرایش صورت", icon: "✦" },
  { slug: "lips", title: "آرایش لب", icon: "❀" },
  { slug: "perfume", title: "عطر و ادکلن", icon: "✺" },
  { slug: "hair", title: "مراقبت از مو", icon: "✼" },
  { slug: "body", title: "بدن و حمام", icon: "❁" },
];

export const BRANDS = ["گل‌سا", "لومیه", "پاریس بل", "اسکین لب", "رزا", "نیووآ", "بل‌فام", "اوریفلیم"];

export const POSTS = [
  { slug: "skin-routine", title: "روتین کامل مراقبت از پوست در ۷ مرحله", excerpt: "از پاک‌کننده تا کرم ضدآفتاب؛ راهنمای جامع پوست درخشان.", readTime: "۸ دقیقه", date: "۲ خرداد ۱۴۰۴" },
  { slug: "perfume-guide", title: "چگونه عطر مناسب فصل را انتخاب کنیم؟", excerpt: "نکاتی برای انتخاب رایحه‌ای که ماندگاری و حس درستی بدهد.", readTime: "۵ دقیقه", date: "۲۸ اردیبهشت ۱۴۰۴" },
  { slug: "lip-trends", title: "ترندهای رنگ رژ لب در سال ۱۴۰۴", excerpt: "از نود طبیعی تا قرمز کلاسیک؛ رنگ‌هایی که نباید از دست بدهید.", readTime: "۴ دقیقه", date: "۱۹ اردیبهشت ۱۴۰۴" },
];

export const TESTIMONIALS = [
  { name: "نسترن محمدی", text: "کیفیت محصولات عالی و بسته‌بندی فوق‌العاده. ارسال هم خیلی سریع بود.", rating: 5 },
  { name: "سارا کریمی", text: "اولین خریدم بود و واقعاً راضی‌ام. اصالت محصولات کاملاً قابل اعتماده.", rating: 5 },
  { name: "مهسا رضایی", text: "پشتیبانی مهربون و راهنمایی خوبشون باعث شد محصول درست رو انتخاب کنم.", rating: 5 },
];

export const FAQS = [
  { q: "آیا محصولات اصل هستند؟", a: "بله، تمامی محصولات گل‌سا با گارانتی اصالت و مستقیماً از نمایندگی‌های رسمی برندها تأمین می‌شوند." },
  { q: "روش پرداخت چگونه است؟", a: "در حال حاضر پرداخت به‌صورت کارت‌به‌کارت انجام می‌شود. پس از ثبت سفارش، اطلاعات حساب نمایش داده می‌شود و شما رسید پرداخت را آپلود می‌کنید." },
  { q: "ارسال سفارش چند روز طول می‌کشد؟", a: "سفارش‌ها پس از تایید پرداخت، ظرف ۱ تا ۳ روز کاری ارسال می‌شوند. ارسال به سراسر ایران انجام می‌شود." },
  { q: "امکان مرجوع کردن کالا وجود دارد؟", a: "بله، تا ۷ روز پس از دریافت کالا در صورت سالم بودن بسته‌بندی و عدم استفاده، امکان مرجوعی وجود دارد." },
  { q: "چگونه با پشتیبانی در تماس باشم؟", a: "از طریق صفحه تماس با ما، ایمیل support@golsa.shop یا شماره ۰۲۱-۱۲۳۴۵۶۷۸ در ساعات اداری در دسترس هستیم." },
];

export const SLIDES = [
  { title: "زیبایی واقعی، از همان لمس اول", subtitle: "مجموعه جدید مراقبت از پوست با عصاره گل رز", cta: "مشاهده مجموعه", href: "/category/skincare", tag: "تازه رسید" },
  { title: "تا ۴۰٪ تخفیف ویژه عطرها", subtitle: "رایحه‌های ماندگار از برندهای جهانی", cta: "خرید عطر", href: "/category/perfume", tag: "تخفیف ویژه" },
  { title: "رنگ‌های جدید پاییزی", subtitle: "رژ لب ولوت در ۱۲ رنگ نو", cta: "ببینید", href: "/category/lips", tag: "کالکشن جدید" },
];

export type ProductReview = {
  name: string;
  rating: number;
  date: string;
  title: string;
  text: string;
  verified?: boolean;
};

export type ProductDetail = {
  description: string;
  highlights: string[];
  ingredients: string[];
  usage: string[];
  suitableFor: string[];
  specs: { label: string; value: string }[];
  variants?: { label: string; color: string }[];
  gallery: string[];
  reviews: ProductReview[];
};

const DEFAULT_REVIEWS: ProductReview[] = [
  { name: "نگار حسینی", rating: 5, date: "۱۲ خرداد ۱۴۰۴", title: "فوق‌العاده‌ست", text: "بافتش سبکه و خیلی خوب جذب میشه. پوستم بعد از دو هفته شفاف‌تر شده.", verified: true },
  { name: "آرزو محمدی", rating: 4, date: "۲ خرداد ۱۴۰۴", title: "راضی‌ام", text: "بسته‌بندی شیک و کیفیت خوب. فقط کاش حجمش کمی بیشتر بود.", verified: true },
  { name: "مریم صالحی", rating: 5, date: "۲۷ اردیبهشت ۱۴۰۴", title: "تجربه عالی", text: "ارسال سریع، اصالت محصول تأیید شده و نتیجه‌ش روی پوستم خیلی خوب بود.", verified: false },
];

export function getProductDetail(p: Product): ProductDetail {
  return {
    description:
      `${p.title} از برند ${p.brand} با فرمولاسیون پیشرفته و ترکیبات طبیعی، تجربه‌ای لوکس از مراقبت روزانه را برای شما به ارمغان می‌آورد. این محصول با تست‌های درماتولوژی تأیید شده و برای استفاده روزانه مناسب است.`,
    highlights: [
      "آبرسانی عمیق و طولانی‌مدت",
      "بدون پارابن و سولفات",
      "تست شده زیر نظر متخصص پوست",
      "بسته‌بندی لوکس و قابل بازیافت",
      "ماندگاری بالا و جذب سریع",
    ],
    ingredients: [
      "عصاره گل رز دمشقی",
      "هیالورونیک اسید",
      "ویتامین E و B5",
      "روغن جوجوبا",
      "نیاسینامید ۵٪",
      "گلیسیرین گیاهی",
    ],
    usage: [
      "پوست را با پاک‌کننده ملایم شست‌وشو دهید.",
      "مقدار کمی از محصول را روی صورت و گردن قرار دهید.",
      "با حرکات دایره‌ای ملایم ماساژ دهید تا کاملاً جذب شود.",
      "صبح و شب به‌صورت روتین استفاده کنید؛ روزها همراه با ضدآفتاب.",
    ],
    suitableFor: ["پوست خشک", "پوست معمولی", "پوست حساس", "پوست مختلط"],
    specs: [
      { label: "برند", value: p.brand },
      { label: "دسته‌بندی", value: p.category },
      { label: "حجم", value: "۵۰ میلی‌لیتر" },
      { label: "کشور سازنده", value: "فرانسه" },
      { label: "تاریخ انقضا", value: "۳۶ ماه پس از تولید" },
      { label: "کد محصول", value: `GLS-${p.id.padStart(4, "0")}` },
    ],
    variants: [
      { label: "صورتی", color: "#f9b4c4" },
      { label: "سبز", color: "#b6dcb4" },
      { label: "نارنجی", color: "#f6c48a" },
      { label: "آبی", color: "#aac9e6" },
    ],
    gallery: [p.image, p.image, p.image, p.image],
    reviews: DEFAULT_REVIEWS,
  };
}