import { auth, signOut } from "@/auth";
import React from "react";

const page = async () => {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}

      <div className="">
        <form
          action={async () => {
            "use server";

            await signOut();
          }}
        >
          <button>SignOut</button>
        </form>
      </div>
    </div>
  );
};

export default page;
