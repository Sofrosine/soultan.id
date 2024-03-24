"use client";

import Navbar from "@/components/Navbar";
import { useInView } from "react-intersection-observer";
import HomeAbout from "./(fragments)/HomeAbout";
import HomeBlog from "./(fragments)/HomeBlog";
import HomeFyi from "./(fragments)/HomeFyi";
import HomeJourney from "./(fragments)/HomeJourney";
import HomePortofolio from "./(fragments)/HomePortofolio";

export default function Home() {
  // const [homeRef, homeInView, homeEntry] = useInView({ threshold: 0.3 });
  const homeView = useInView({});
  const portofolioView = useInView({ threshold: 0.1 });
  const journeyView = useInView({ threshold: 0.3 });
  const blogView = useInView({});
  const fyiView = useInView();

  const [homeRef, homeInView, homeEntry] = homeView;
  const [blogRef, blogInView, blogEntry] = blogView;
  const [fyiRef, fyiInView, fyiEntry] = fyiView;
  const [journeyRef, journeyInView, journeyEntry] = journeyView;
  const [portofolioRef, portofolioInView, portofolioEntry] = portofolioView;

  return (
    <div className="text-black-text">
      <Navbar
        view={{
          homeView: {
            homeInView,
            homeEntry,
          },
          portofolioView: {
            portofolioInView,
            portofolioEntry,
          },
          blogView: {
            blogInView,
            blogEntry,
          },
          fyiView: {
            fyiInView,
            fyiEntry,
          },
          journeyView: {
            journeyInView,
            journeyEntry,
          },
        }}
      />
      <main className="flex flex-col">
        <HomeAbout
          ref={homeRef}
          onClickDown={() => {
            portofolioEntry?.target.scrollIntoView({
              behavior: "smooth",
            });
          }}
        />
        <HomePortofolio ref={portofolioRef} />
        <HomeJourney ref={journeyRef} />
        <HomeBlog ref={blogRef} />
        <HomeFyi ref={fyiRef} />
      </main>
    </div>
  );
}
