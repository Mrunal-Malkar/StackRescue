"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
import Idea from "./idea";
import Project from "./project";

const Page = () => {
  const stack = useSearchParams().get("stack");
  if (stack == "idea") {
    return <Idea />;
  } else if (stack == "project") {
    return <Project />;
  } else {
    return <div>Page:Not found</div>
  }
};

export default Page;
