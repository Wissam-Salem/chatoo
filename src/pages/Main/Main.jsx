import React from "react";
import Header from "../../components/Header/Header";
import authenticate from "../../components/Authentication/Authentication";
import { useQuery } from "react-query";
export default function Main() {
  let { data: isAuthenticated, isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: authenticate,
  });
  console.log(isAuthenticated?.data?.success);

  return (
    <>
      {!isLoading && isAuthenticated.data.success === false && (
        <div>
          <Header
            isAuthenticated={isAuthenticated?.data?.success}
            pfp={isAuthenticated?.data?.user?.pfp}
          />
          <div className="h-[calc(100vh-20rem)] flex justify-center items-center text-5xl max-sm:text-4xl text-center">
            <h1>
              Welcome To{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-tr from-blue-600 via-slate-500 to-zinc-800">
                Chatoo
              </span>
            </h1>
          </div>
        </div>
      )}
      {!isLoading &&
        isAuthenticated.data.success &&
        window.location.assign("/home")}
      {isLoading && <div></div>}
    </>
  );
}
