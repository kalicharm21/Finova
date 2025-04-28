import HeroSection from "@/components/hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { featuresData, howItWorksData, statsData, testimonialsData } from "@/data/landing";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mt-40">

      <HeroSection /> 

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {statsData.map((stats, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-extrabold text-blue-600 mb-2">{stats.value}</div>
                <div className="text-gray-500 text-lg">{stats.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Everything you need to manage your finances</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuresData.map((feature, index) => (
              <Card 
                key={index} 
                className="p-6 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl border hover:border-blue-300"
              >
                <CardContent className="space-y-4 pt-4 text-center">
                  <div className="text-blue-600">{feature.icon}</div>
                  <h3 className="text-2xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-500">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-200">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {howItWorksData.map((step, index) => (
              <div key={index} className="text-center p-6 bg-white shadow-md rounded-2xl hover:shadow-xl transition">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonialsData.map((testimonial, index) => (
              <Card 
                key={index} 
                className="p-8 rounded-3xl shadow-md hover:shadow-2xl transition bg-gradient-to-r from-blue-50 to-white"
              >
                <CardContent className="space-y-4 pt-4">
                  <div className="flex items-center mb-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="rounded-full border-2 border-blue-500"
                    />
                    <div className="ml-4 text-left">
                      <div className="font-semibold text-gray-800">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="relative overflow-hidden py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container mx-auto text-center relative z-10">
          <div className="rounded-3xl p-12 shadow-2xl mx-auto transition-all duration-300 bg-white/10 backdrop-blur-lg border border-white/30 max-w-4xl">
            <h2 className="text-4xl font-extrabold text-white mb-6 drop-shadow-lg">
              Ready to take control of your finances?
            </h2>
            <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg">
              Join us today and start your journey towards financial freedom with <span className="text-white font-bold">Finova</span>.
            </p>
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-white text-blue-700 font-semibold hover:bg-blue-100 transition-all duration-300 shadow-lg hover:scale-105 rounded-full px-10 py-6"
              >
                Start Free Trial
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative Blurs */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-purple-500/30 rounded-full filter blur-3xl opacity-40 -z-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/30 rounded-full filter blur-3xl opacity-40 -z-10" />
      </section>

    </div>
  );
}
