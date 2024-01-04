import { signIn, signOut, useSession } from "next-auth/react";

export const Header = () => {
  const { data: sessionData } = useSession();

  const handleLogout = async () => {
    try {
      await signOut();
  
    } catch (error) {
     
      console.error("Error during logout:", error);
    }
  };

  const handleSignIn = async () => {
    try {
      await signIn();
      
    } catch (error) {
      
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <div className="navbar bg-info-content text-primary-content">
      <div className="flex-1 pl-5 text-1xl font-bold text-white">
        {sessionData?.user?.name ? `${sessionData.user.name}` : ""}
      </div>
      <div className="flex-none gap-2 relative">
        {sessionData?.user ? (
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
              <div className="w-8 rounded-full">
                <img
                  src={sessionData?.user?.image ?? ""}
                  alt={sessionData?.user?.name ?? ""}
                />
              </div>
              <ul className="dropdown-content bg-black bg-opacity-30  shadow rounded-md absolute right-0 mt-40">
                <li>
                  <button className="block rounded px-8 py-2 hover:bg-white hover:bg-opacity-25 text-white w-full text-left">
                    Profile
                  </button>
                </li>
                <li>
                  <button className="block px-8 rounded py-2 hover:bg-white hover:bg-opacity-25 text-white w-full text-left">
                    Settings
                  </button>
                </li>
                <li>
                  <button
                    className="block px-8 py-2 rounded hover:bg-white hover:bg-opacity-25 text-white  w-full text-left"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </label>
          </div>
        ) : (
          <button
            className="rounded-btn btn glass text-white font-semibold"
            onClick={handleSignIn}
          >
            Sign in
          </button>
        )}
      </div>
    </div>
  );
};
