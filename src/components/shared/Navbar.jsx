import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import axios from "axios";

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Fusion</span>
          </h1>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="">
                  <div className="flex gap-2 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col my-2 text-gray-600">
                    {user && user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                    )}

                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h1 className="text-2xl font-bold">
                Job<span className="text-[#F83002]">Fusion</span>
              </h1>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <ul className="flex flex-col space-y-4">
                {user && user.role === "recruiter" ? (
                  <>
                    <li>
                      <Link 
                        to="/admin/companies" 
                        className="block p-2 hover:bg-gray-100 rounded-md"
                        onClick={toggleMenu}
                      >
                        Companies
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/admin/jobs" 
                        className="block p-2 hover:bg-gray-100 rounded-md"
                        onClick={toggleMenu}
                      >
                        Jobs
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link 
                        to="/" 
                        className="block p-2 hover:bg-gray-100 rounded-md"
                        onClick={toggleMenu}
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/jobs" 
                        className="block p-2 hover:bg-gray-100 rounded-md"
                        onClick={toggleMenu}
                      >
                        Jobs
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/browse" 
                        className="block p-2 hover:bg-gray-100 rounded-md"
                        onClick={toggleMenu}
                      >
                        Browse
                      </Link>
                    </li>
                  </>
                )}
              </ul>

              {!user ? (
                <div className="mt-6 space-y-2">
                  <Link to="/login" onClick={toggleMenu}>
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link to="signup" onClick={toggleMenu}>
                    <Button className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]">
                      Signup
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="mt-6 p-4 border-t">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar>
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="profile"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                    </div>
                  </div>
                  {user.role === "student" && (
                    <Link 
                      to="/profile" 
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
                      onClick={toggleMenu}
                    >
                      <User2 className="h-5 w-5" />
                      <span>View Profile</span>
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logoutHandler();
                      toggleMenu();
                    }}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md w-full"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
