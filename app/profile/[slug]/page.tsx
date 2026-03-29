"use client";

import { useState } from "react";
import Sidebar from "../../../components/sidebar";
import {
  BaseStack,
  GeneralStackType,
  InViewType,
  RequestStackType,
  requestType,
} from "../../../type/types";
import { useSession } from "next-auth/react";
import SignInPage from "@/components/sign-in";
import Loader from "@/components/ui/Loader";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  LucideChartNoAxesColumnDecreasing,
  Plus,
  ScanLine,
  Undo2,
} from "lucide-react";
import ProfileModal from "@/components/profileModal";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import fetchStacks from "@/app/functions/FetchStacksProfile";
import { fetchData } from "@/app/functions/FetchProfileData";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import RequestStackModal from "@/components/requeststackmodal";
import StackModalForProfile from "@/components/stackModalForProfile";

const Page = () => {
  const { data: session, status } = useSession();
  const [profileModal, setProfileModal] = useState(false);
  const [ShowRequestStackModal, setShowRequestStackModal] = useState(false);
  const [CurrentRequestStack, setCurrentRequestStack] =
    useState<RequestStackType>();
  const [ShowStackModel, setShowStackModel] = useState<boolean>(false);
  const [CurrentStackModel, setCurrentStackModel] =
    useState<GeneralStackType>();
  const [InView, setInView] = useState<InViewType>("All");
const [isAccepting, setIsAccepting] = useState(false);
  const router = useRouter();

  const { data, error, isLoading } = useQuery({
    queryKey: ["profileData"],
    queryFn: fetchData,
    enabled: status === "authenticated",
  });

  const {
    data: stacks,
    error: stacksError,
    isLoading: isStacksLoading,
    isFetching: isStacksFetching,
  } = useQuery<GeneralStackType[], Error>({
    queryKey: ["stacks", InView],
    queryFn: () => fetchStacks(InView),
    enabled: status === "authenticated",
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 2,
  });

  if (status == "loading") {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (status == "unauthenticated") {
    return <SignInPage />;
  }

  if (isLoading) {
    return (
      <div className="w-screen h-screen bg-gray-800 flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-screen bg-gray-800 relative h-screen flex flex-col justify-center items-center gap-2">
        <div
          className="absolute top-15 left-18 cursor-pointer"
          onClick={() => {
            router.push("/explore");
          }}
        >
          <Undo2 className="text-white size-8 cursor-pointer" />
        </div>
        <div>
          <LucideChartNoAxesColumnDecreasing className="size-6 text-gray-300" />
          <p className="font-semibold text-gray-300">
            {error.message
              ? error.message
              : "Some error occurred, please try again later."}
          </p>
        </div>
      </div>
    );
  }

  if (data === 404) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center gap-3 bg-gray-950">
        <div
          className="absolute top-15 left-18 cursor-pointer"
          onClick={() => {
            router.push("/explore");
          }}
        >
          <Undo2 className="text-white size-8 cursor-pointer" />
        </div>

        <div className="flex flex-col justify-center items-center gap-3">
          <ScanLine className="size-8 text-white" />
          <p className="text-gray-400 font-semibold">No profile found.</p>
          <button
            onClick={() => setProfileModal(true)}
            className="px-4 py-2 text-gray-200 rounded-md bg-gray-800 flex justify-center items-center gap-1"
          >
            <p>Create One.</p>
            <Plus className="size-4" />
          </button>
          <ProfileModal
            isOpen={profileModal}
            onClose={() => setProfileModal(false)}
          />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <p className="text-gray-400">No data available.</p>
      </div>
    );
  }


async function handleAcceptRequest(
  requestedBy: string,
  stackId: string,
  stackType: string,
) {
  if (!session?.user?.id) {
    toast.error("You must be signed in to accept requests.");
    return;
  }

  if (isAccepting) return;

  setIsAccepting(true);

  try {
    const res = await fetch("/api/req/acceptRequest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestedBy,
        to: session.user.id,
        stackId,
        stackType,
      }),
    });

    const resJson = await res.json();

    if (!res.ok) {
      throw new Error(resJson.message || "Unable to accept request.");
    }

    toast.success(resJson.message || "Request accepted successfully!");
    window.location.reload(); // ✅ added
  } catch (error) {
    toast.error(
      error instanceof Error
        ? error.message
        : "Failed to accept the request."
    );
  } finally {
    setIsAccepting(false);
  }
}

  function handleRequestClick(stackId: string, stackType: string) {
    setShowRequestStackModal(true);
    setCurrentRequestStack({ stackId, stackType });
  }

  function handleStackClick(item: GeneralStackType) {
    setShowStackModel(true);
    setCurrentStackModel(item);
  }

  return (
    <div className="w-full relative h-screen min-h-screen bg-neutral-950 text-white flex">
      <ToastContainer />
      <Sidebar />
      <div className="w-full h-screen min-h-screen bg-neutral-950 text-white flex flex-col sm:flex-row overflow-y-auto">
        {/* LEFT SIDE */}
        <div className="sm:w-[360px] w-full sm:h-full flex justify-center items-center p-6">
          <div className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col gap-5">
            <div className="flex flex-col items-center text-center gap-3 gap-y-6">
              <CldImage
                src={`${data.profileImage}`}
                className="w-24 h-24 rounded-full object-cover border border-neutral-700"
                width="320"
                height="320"
                alt="avatar"
              />
              <div>
                <h1 className="text-xl font-semibold tracking-tight">
                  {(session?.user.name).toUpperCase()}
                </h1>
                <p className="text-sm text-neutral-400">{}</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                {data.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-2 py-1 bg-neutral-800 border border-neutral-700 rounded-md"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() =>
                  toast.info("this feature will be available soon.")
                }
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-sm py-2 rounded-lg transition"
              >
                Message
              </button>
              <a
                href={`${data.socialLink}`}
                className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-sm py-2 rounded-lg border border-neutral-700 transition text-center"
              >
                social link
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex flex-col gap-6 p-6 sm:justify-start">
          {/* ABOUT ME */}
          <div className="flex flex-wrap gap-1 flex-col">
            <h1 className="text-2xl font-semibold text-gray-200 tracking-tight sm:text-3xl md:text-4xl">
              About{" "}
              <span className="text-blue-500 text-3xl md:text-5xl sm:text-4xl">
                ME
              </span>
            </h1>
            <p className="max-w-3xl sm:text-lg text-sm text-gray-300">
              {data.about}
            </p>
          </div>

          {/* STATS */}
          <div className="flex gap-6 flex-wrap">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 min-w-[150px]">
              <h2 className="text-xs text-neutral-400">Total Collaborations</h2>
              <p className="text-2xl font-semibold">
                {data.totalCollaborations}
              </p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 min-w-[150px]">
              <h2 className="text-xs text-neutral-400">Stacks Posted</h2>
              <p className="text-2xl font-semibold">{data.createdTotal}</p>
            </div>
          </div>

          {/* requests */}
          <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-semibold text-white">Requests</h1>

            {data.requests?.length < 1 && (
              <p className="text-sm text-neutral-400">No incoming requests.</p>
            )}

            <div className="flex flex-col gap-3">
              {data.requests?.map((req: requestType) => (
                <div
                  key={req.requestedBy._id + req.stackId}
                  onClick={() => {
                    handleRequestClick(req.stackId, req.stackType);
                  }}
                  className="flex items-center justify-between bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 hover:border-neutral-700 transition"
                >
                  {/* LEFT */}
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-800 border border-neutral-700">
                      {req.requestedBy.profileImage ? (
                        <Image
                          height={200}
                          width={100}
                          src={req.requestedBy.profileImage}
                          alt={req.requestedBy.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-neutral-500">
                          N/A
                        </div>
                      )}
                    </div>

                    {/* Name */}
                    <div className="flex flex-col leading-tight">
                      <span className="text-sm md:text-base text-white font-medium hover:underline cursor-pointer">
                        {req.requestedBy.name.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* RIGHT BUTTON */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.nativeEvent.stopImmediatePropagation();
                      handleAcceptRequest(
                        req.requestedBy._id,
                        req.stackId,
                        req.stackType,
                      );
                    }}
                    disabled={isAccepting}
                    className={
                      `px-4 py-1.5 text-sm rounded-lg transition ` +
                      (isAccepting
                        ? "bg-neutral-700 text-neutral-400 border border-neutral-700 cursor-not-allowed"
                        : "bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20")
                    }
                  >
                    {isAccepting
                      ? "Accepting..."
                      : "Accept"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* NAVIGATION */}
          <div className="flex gap-3 mt-5 overflow-x-auto border-b border-neutral-800 pb-2 text-sm">
            {(["Posted", "Collaborated", "All"] as InViewType[]).map((view) => (
              <button
                key={view}
                onClick={() => setInView(view)}
                className={`${InView === view ? "text-blue-500" : "text-neutral-200"} hover:cursor-pointer`}
              >
                {view === "Posted"
                  ? "Projects Posted"
                  : view === "Collaborated"
                    ? "Projects Collaborated"
                    : "All"}
              </button>
            ))}
          </div>

          {/* PROJECT LIST AREA */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isStacksLoading ? (
              <p className="text-gray-400">Loading stacks...</p>
            ) : stacksError ? (
              <p className="text-red-400">Failed to load stacks.</p>
            ) : stacks && stacks.length > 0 ? (
              stacks.map((item) => {
                return (
                  <div
                    key={item._id}
                    onClick={() => {
                      handleStackClick(item);
                    }}
                    className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col gap-2"
                  >
                    <h3 className="font-semibold text-blue-400">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-400 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-400">No stacks to display.</p>
            )}
          </div>
        </div>
      </div>
      {CurrentRequestStack && (
        <RequestStackModal
          stackInfo={CurrentRequestStack}
          isOpen={ShowRequestStackModal}
          onClose={() => setShowRequestStackModal(false)}
        />
      )}
      {CurrentStackModel && (
        <StackModalForProfile
          stack={CurrentStackModel}
          onClose={() => setShowStackModel(false)}
          isOpen={ShowStackModel}
        />
      )}
      <ProfileModal
        isOpen={profileModal}
        onClose={() => setProfileModal(false)}
      />
    </div>
  );
};

export default Page;
