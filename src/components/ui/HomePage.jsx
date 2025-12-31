"use client";

import Link from "next/link";
import Container from "../shared/Container";
import Button from "./Button";
import { AiFillHeart, AiOutlineCheckCircle } from "react-icons/ai";
import { FaHandsHelping } from "react-icons/fa";
import Image from "next/image";
import aboutImage from "@/assets/images/about_section.avif";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    title: "Care with Compassion",
    subtitle:
      "Supporting families and professional carers with trustworthy, modern tools.",
    cta: "Get Started",
  },
  {
    title: "Trusted Caregivers",
    subtitle:
      "Find qualified carers and manage care plans with ease and dignity.",
    cta: "Find carers",
  },
  {
    title: "Community & Support",
    subtitle: "Resources, training and connections to help caregiving thrive.",
    cta: "Learn more",
  },
];

const testimonials = [
  {
    name: "Maria K.",
    text: "KinCare helped our family find the perfect caregiver — compassionate and professional.",
  },
  {
    name: "John D.",
    text: "Scheduling and communication are so much easier now. Highly recommend!",
  },
  {
    name: "Ayesha R.",
    text: "The platform's guides gave me confidence as a new carer.",
  },
];

const HomePage = ({ categories = [] }) => {
  console.log(categories);

  return (
    <>
      {/* Banner / Slider */}
      <section className="py-12 bg-linear-to-b from-base-100 to-base-200">
        <Container>
          <div className="max-w-6xl mx-auto">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 4500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation={true}
              className="rounded-lg overflow-hidden"
            >
              {slides.map((s, idx) => (
                <SwiperSlide key={idx}>
                  <div className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-12 bg-white/80 dark:bg-base-300/60 rounded-lg shadow-sm">
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-4xl font-bold leading-tight">
                        {s.title}
                      </h2>
                      <p className="mt-4 text-sm md:text-base text-muted">
                        {s.subtitle}
                      </p>

                      <div className="mt-6">
                        <Link href="/register">
                          <Button className="px-6 py-3">{s.cta}</Button>
                        </Link>
                      </div>
                    </div>

                    <div className="flex-1 w-full">
                      <div className="aspect-4/3 rounded-md overflow-hidden bg-gray-100">
                        <img
                          src={`https://source.unsplash.com/1200x900/?caregiving,elderly,health&sig=${idx}`}
                          alt={s.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Container>
      </section>

      {/* Service Overview - modernized */}
      <section className="py-14 bg-linear-to-b from-base-100/60 to-base-200/40">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Service Overview
              </h2>
              <p className="mt-2 text-sm text-muted max-w-xl">
                Discover our curated care categories — designed to help families
                and carers find the right match quickly and confidently.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((cat) => (
                <article
                  key={cat._id}
                  className="relative group bg-white/75 dark:bg-base-300/60 p-5 rounded-2xl shadow-sm hover:shadow-lg transform transition hover:-translate-y-1 focus-within:-translate-y-1"
                  tabIndex={0}
                  aria-labelledby={`cat-${cat._id}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-linear-to-br from-primary to-secondary text-white shadow-md">
                        <span className="font-semibold">
                          {String(cat.name || "")
                            .split(" ")
                            .slice(0, 2)
                            .map((w) => w[0])
                            .join("")}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3
                        id={`cat-${cat._id}`}
                        className="text-base md:text-lg font-semibold truncate"
                      >
                        {cat.name}
                      </h3>
                      <p className="text-sm text-muted mt-1 line-clamp-2">
                        Expert-led services and tailored care for{" "}
                        {cat.name.toLowerCase()} — vetted professionals and easy
                        booking.
                      </p>
                      <div className="mt-4 flex items-center gap-3">
                        <Link
                          href={`/services/${cat._id}`}
                          aria-label={`Explore ${cat.name}`}
                        >
                          <Button className="px-4 py-2 text-sm">Explore</Button>
                        </Link>
                        <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          Popular
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* subtle hover accent */}
                  <span className="pointer-events-none absolute -bottom-3 -right-6 w-36 h-36 bg-linear-to-tr from-primary/5 to-secondary/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* About */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold">
                Built for families and carers
              </h3>
              <p className="mt-4 text-lg text-muted">
                KinCare is a human-first caregiving platform — we help you find
                trusted support, manage schedules, and access helpful resources
                so you can spend more time with the people you love.
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                <div className="p-5 border rounded-lg shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl text-primary bg-primary/10 rounded-full p-2">
                      <AiFillHeart />
                    </div>
                    <div>
                      <div className="font-semibold">Compassionate Care</div>
                      <div className="text-sm text-muted">
                        Vetted carers who respect dignity.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 border rounded-lg shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl text-secondary bg-secondary/10 rounded-full p-2">
                      <FaHandsHelping />
                    </div>
                    <div>
                      <div className="font-semibold">Simple Scheduling</div>
                      <div className="text-sm text-muted">
                        Easy bookings and transparent rates.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 border rounded-lg shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl text-accent bg-accent/10 rounded-full p-2">
                      <AiOutlineCheckCircle />
                    </div>
                    <div>
                      <div className="font-semibold">Trusted Matches</div>
                      <div className="text-sm text-muted">
                        Profiles with reviews and background checks.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 border rounded-lg shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl text-primary bg-primary/10 rounded-full p-2">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M3 12h18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M12 3v18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold">Resources & Training</div>
                      <div className="text-sm text-muted">
                        Guides, checklists and on-demand learning.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <Link href="/register">
                  <Button className="px-6 py-3">Get started</Button>
                </Link>
                <Link
                  href="/service/sample"
                  className="text-sm text-primary hover:underline"
                >
                  Browse services
                </Link>
              </div>
            </div>

            <div className="w-full">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={aboutImage.src}
                  alt="Caregiving"
                  className="w-full h-80 object-cover"
                  loading="lazy"
                  width={550}
                  height={320}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials / Success metrics */}
      <section className="py-16 bg-base-100">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="text-2xl font-semibold">What people say</h4>
                <div className="mt-6 space-y-4">
                  {testimonials.map((t, i) => (
                    <div
                      key={i}
                      className="p-4 bg-white/60 rounded-lg shadow-sm"
                    >
                      <p className="text-sm text-muted">{t.text}</p>
                      <div className="mt-3 font-medium">— {t.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-linear-to-br from-primary/30 to-secondary/30 rounded-lg text-center">
                  <div className="text-3xl font-bold">1.2k+</div>
                  <div className="text-sm text-muted mt-1">Active users</div>
                </div>
                <div className="p-6 bg-linear-to-br from-accent/30 to-primary/10 rounded-lg text-center">
                  <div className="text-3xl font-bold">4.9/5</div>
                  <div className="text-sm text-muted mt-1">Average rating</div>
                </div>
                <div className="p-6 bg-linear-to-br from-secondary/20 to-base-200 rounded-lg text-center">
                  <div className="text-3xl font-bold">980+</div>
                  <div className="text-sm text-muted mt-1">
                    Successful matches
                  </div>
                </div>
                <div className="p-6 bg-linear-to-br from-primary/10 to-secondary/20 rounded-lg text-center">
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-sm text-muted mt-1">
                    Support availability
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default HomePage;
