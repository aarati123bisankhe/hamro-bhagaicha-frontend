// "use client";

// import ChangePasswordForm from "../components/ResetPasswordForm";

// import { useSearchParams } from "next/navigation";

// export default function ChangePasswordPage() {
//   const searchParams = useSearchParams();
//   const token = searchParams.get("token") || "";

//   return <ChangePasswordForm token={token} />;
// }

// Make sure the file exists at the correct path and the import matches the file name (case-sensitive)
// import ResetPasswordForm from "../components/ResetPasswordForm";

// export default async function Page({
//     searchParams
// }: {
//     searchParams: Promise<{ [key: string]: string | string[] | undefined }>
// }) {
//     const query = await searchParams;
//     const token = query.token ? (query.token as string) : '';
//     return (
//         <div>
//             <ResetPasswordForm token={token} />
//         </div>
//     );
// }



import ResetPasswordForm from "../components/ResetPasswordForm";

export default async function Page({
    searchParams
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const query = await searchParams;
    const token = query.token ? (query.token as string) : '';
    return (
        <div>
            <ResetPasswordForm token={token} />
        </div>
    );
}