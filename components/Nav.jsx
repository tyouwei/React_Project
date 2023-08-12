"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"

const Nav = () => {
  const { data: session} = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setDropdown] = useState(false);

  useEffect(() =>{
    const helper = async () => {
      const response = await getProviders();

      setProviders(response);
    }
    helper();
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image 
          src="/assets/images/logo.svg" 
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">ChatEasy</p>
      </Link>

      {/*Desktop Navigation*/}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link 
              href="/manage-files"
              className="black_btn">
                Manage Files
            </Link>
            <button className="outline_btn" onClick={signOut}>
              Sign Out
            </button>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map(provider => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn">
                    Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/*Mobile Navigation*/}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            {toggleDropdown ? (
            <Image
              src="/assets/images/dropdownup.svg"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => setDropdown((bool) => !bool)}
            />
            ) : (
              <Image
                src="/assets/images/dropdowndown.svg"
                width={37}
                height={37}
                className="rounded-full"
                onClick={() => setDropdown((bool) => !bool)}
              />
            )}

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/manage-files"
                  className="dropdown_link"
                  onClick={() => setDropdown(false)}
                  >
                    Manage Files
                </Link>
                <button
                  className="mt-5 w-full black_btn"
                  onClick={() => {
                    setDropdown(false);
                    signOut();
                  }}>
                    Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map(provider => (
                <button
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn">
                    Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav