import React from "react";
import Header from "../../components/Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useQuery } from "react-query";
import authenticate from "../../components/Authentication/Authentication";

export default function AboutUs() {
  let { data: isAuthenticated } = useQuery({
    queryKey: ["auth"],
    queryFn: authenticate,
  });
  return (
    <div>
      <Header
        isAuthenticated={isAuthenticated?.data?.success}
        pfp={isAuthenticated?.data?.user?.pfp}
      />
      <div className="h-[calc(100vh-20rem)] flex flex-col justify-center items-center gap-10">
        <h1 className="text-4xl text-white">About Us</h1>
        <p className="w-[30rem] max-md:w-[20rem] text-center leading-relaxed">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos eos sum
          reiciendis necessitatibus recusandae nemo adipisci voluptate quia vero
          eius ab debitis, id iusto aut est soluta error incidunt fugiat?
          Recusandae porro maxime eos molestias alias quos tenetur ducimus aut?
        </p>
      </div>
      <div className="flex justify-center gap-5">
        <a
          href="https://github.com/Wissam-Salem"
          target="_blank"
          title="Github"
          className="btn btn-neutral"
        >
          <FontAwesomeIcon
            icon={faGithub}
            size="2xl"
            style={{ color: "#000000" }}
          />
        </a>
        <a
          href="https://x.com/Wissamsalem10"
          title="Twitter / X"
          target="_blank"
          className="btn btn-neutral"
        >
          <FontAwesomeIcon
            icon={faTwitter}
            size="2xl"
            style={{ color: "#1a6eff" }}
          />
        </a>
        <a
          href="https://mostaql.com/u/Wissam_Salem"
          title="Mostaql"
          target="_blank"
          className="btn btn-neutral"
        >
          <img
            width={28}
            height={28}
            src="https://zaetoon.hsoubcdn.com/helpdesk/4/files/f5fb769d-041c-4c75-8ac6-d3543eae1d06.png"
            alt=""
          />
        </a>
      </div>
    </div>
  );
}
