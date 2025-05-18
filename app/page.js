"use client";

import { useEffect, useState } from "react";
import { userData } from "../data/user-data";
import Contributions from "./components/contributions";
import HeroSection from "./components/hero-section";
import GitLanguage from "./components/language";
import Projects from "./components/projects";
import Rank from "./components/rank";
import GitStats from "./components/stats";
import SetFavicon from "./components/SetFavicon";

export default function Home() {
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);

  // Lấy thông tin profile GitHub động mỗi lần client load
  useEffect(() => {
    fetch(`https://api.github.com/users/${userData.githubUser}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => setProfile(data))
      .catch(console.error);
  }, []);

  // Lấy danh sách repos động mỗi lần profile thay đổi
  useEffect(() => {
    if (!profile) return;

    fetch(
      `https://api.github.com/users/${userData.githubUser}/repos?sort=created&direction=desc&per_page=10`,
      {
        // const res = await fetch(`https://api.github.com/search/repositories?q=user:${userData.githubUser}+fork:false&sort=stars&per_page=10&type=Repositories`)
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => setProjects(data))
      .catch(console.error);
  }, [profile]);

  return (
    <>
      {profile && <SetFavicon iconUrl={profile.avatar_url} />}

      {profile && <HeroSection profile={profile} />}
      <GitStats />
      <Projects projects={projects} profile={profile} />
      <GitLanguage />
      <Rank />
      <Contributions />
    </>
  );
}

// Nếu bạn vẫn muốn dùng generateMetadata, hãy chuyển export này vào server component riêng và import Home vào trong đó
// export async function generateMetadata({ params, searchParams }, parent) {
//   const profile = await fetch(`https://api.github.com/users/${userData.githubUser}`, { cache: "no-store" }).then(res => res.json());
//
//   return {
//     title: `GitHub Profile of ${profile.name}`,
//     description: profile.description,
//   };
//}
