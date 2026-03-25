import { authProvider } from "@/lib/auth";
import connectDB from "@/lib/connectDB";
import User from "@/lib/schemaUser";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authProvider);

        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized request" },
                { status: 401 }
            );
        }

        const id = session.user.id;
        const body = await req.json();
        const View = body.currentView;

        if (!View) {
            return NextResponse.json(
                { message: "View is required" },
                { status: 400 } // ✅ fixed (was 404)
            );
        }

        const result = await getStack(View, id);

        if (!result.success) {
            return NextResponse.json(
                { message: result.error },
                { status: result.status || 500 }
            );
        }

        return NextResponse.json(
            { data: result.data },
            { status: 200 }
        );

    } catch (e) {
        console.error(e);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}


async function getStack(View: string, userId: string) {
    if (!View || !userId) {
        return {
            success: false,
            error: "Missing required parameters",
            status: 400
        };
    }

    await connectDB();

    try {
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return {
                success: false,
                error: "User not found. Please create a profile.",
                status: 404
            };
        }

        switch (View.toLowerCase()) {

            case "all": {
                await user.populate([
                    "projects.created",
                    "projects.collaborated",
                    "ideas.created",
                    "ideas.collaborated"
                ]);

                const allItems = [
                    ...(user.projects?.created || []),
                    ...(user.projects?.collaborated || []),
                    ...(user.ideas?.created || []),
                    ...(user.ideas?.collaborated || [])
                ];

                const sorted = allItems.sort((a, b) =>
                    new Date(b.created).getTime() - new Date(a.created).getTime()
                );

                return { success: true, data: sorted };
            }

            case "collaborated": {
                await user.populate([
                    "projects.collaborated",
                    "ideas.collaborated"
                ]);

                const collaboratedItems = [
                    ...(user.projects?.collaborated || []),
                    ...(user.ideas?.collaborated || [])
                ];

                const sorted = collaboratedItems.sort((a, b) =>
                    new Date(b.created).getTime() - new Date(a.created).getTime()
                );

                return { success: true, data: sorted };
            }

            case "posted": {
                await user.populate([
                    "projects.created",
                    "ideas.created"
                ]);

                const postedItems = [
                    ...(user.projects?.created || []),
                    ...(user.ideas?.created || [])
                ];

                const sorted = postedItems.sort((a, b) =>
                    new Date(b.created).getTime() - new Date(a.created).getTime()
                );

                return { success: true, data: sorted };
            }

            default:
                return {
                    success: false,
                    error: `Invalid view type: ${View}`,
                    status: 400
                };
        }

    } catch (error) {
        console.error("Error in getStack:", error);

        return {
            success: false,
            error: "Failed to fetch stacks",
            status: 500
        };
    }
}