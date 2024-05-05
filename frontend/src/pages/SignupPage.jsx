import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import Logo from '../components/Logo'
import 'react-toastify/dist/ReactToastify.css';
const SignupPage = () => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [profilePic, setProfilePic] = useState();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (userInfo) {
      navigate('/dashboard')
    }
  }, [navigate])

  const photoUpload = async (pic) => {
    setUploading(true)
    if (pic == undefined) {
      toast.err('Please upload vaild Photo')
      setUploading(false)
    }
    try {
      if (pic.type === "image/jpeg" || pic.type === "image/png") {
        const data = new FormData();
        data.append('file', pic);
        data.append("upload_preset", "quick_pay");
        data.append("cloud_name", "dh8fvd8ow")

        const response = await fetch("https://api.cloudinary.com/v1_1/dh8fvd8ow/image/upload", {
          method: "post",
          body: data,
        });

        if (!response.ok) {
          throw new Error(`Image upload failed with Status ${response.status}`);
        }

        const Data = await response.json();
        setProfilePic(Data.url.toString());
        setUploading(false)
        toast.success("Image Uploaded Successfully");
      }
      else {
        toast.error('Please upload a picture!');
        setUploading(false);
      }
    } catch (e) {
      console.log('Error uploading image:', e);
      toast.error('Image upload failed. Please try again.');
      setUploading(false);
    }
  }
  const handleSubmit = async () => {
    setLoading(true)
    if (!userName || !firstName || !email || !password || !confirmPassword) {
      toast.error('Please Enter all the required fields!')
      setLoading(false)
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Password is not Same! please Enter again')
      setLoading(false)
      return;
    }
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const response = await axios.post("http://localhost:3000/api/v1/user/", {
        username: userName,
        firstName: firstName,
        lastName: lastName,
        email: email,
        profilePic: profilePic,
        password: password
      }, config)

      toast.success("Successfully Signed up");
      localStorage.setItem("userInfo", JSON.stringify(response.data))
      setLoading(false)
      navigate('/dashboard')


    } catch (e) {
      toast.error(`Internal Server Error`)
      setLoading(false)
    }
  }

  return (
    <>
      <div className='grid place-content-center h-full w-auto'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer hover:scale-150 mb-2" onClick={() => {
          navigate('/login')
        }}>
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        <div className='text-center bg-slate-300 p-4 sm:p-10 rounded-lg'>
        <Logo/>
          <div className='text-2xl font-semibold italic text-blue-900 mt-9'>Create new Account</div>
          <div className='flex flex-col'>
            <div class="flex mt-3">
              <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">Email
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 ml-1">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </span>
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                class="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                placeholder="Email"
                autoFocus
              />
            </div>
            <div class="flex mt-1">
              <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">Username
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 ml-1">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </span>
              <input
                type="text"
                onChange={(e) => setUserName(e.target.value)}
                class="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                placeholder="username"
              />
            </div>
            <div className='sm:flex'>

              <div class="flex mt-1 mr-1">
                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">First Name
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 ml-1"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />

                  </svg>
                </span>
                <input
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  class="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                  placeholder="First Name"
                />

              </div>
              <div class="flex mt-1">
                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">Last Name
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6 ml-1">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  class="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div class="flex mt-1">
              <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">Password
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 ml-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                  />
                </svg>

              </span>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                class="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-min text-sm border-gray-300 p-2.5"
                placeholder="Password"
              />
            </div>
            <div class="flex mt-1">
              <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">Confirm Password
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 ml-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                  />
                </svg>

              </span>
              <input
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                class="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-min text-sm border-gray-300 p-2.5"
                placeholder="Confirm Password"
              />
            </div>
            <div class="flex items-center justify-center mt-2">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 text-gray-500 italic font-semibold hover:bg-blue-100"> Upload Profile Pic

                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg class="w-8 h-8 mb-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  {uploading ?
                    (
                      <>
                        <svg
                          aria-hidden="true"
                          role="status"
                          class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="#1C64F2"
                          />
                        </svg>
                        uploading.....
                      </>
                    ) :

                    (
                      <>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">ONLY PNG OR JPG supported</p>
                      </>
                    )
                  }
                </div>
                <input
                  type="file"
                  id="dropzone-file" class="hidden"
                  onChange={(e) => photoUpload(e.target.files[0])}
                />
              </label>
            </div>

            <button className='p-2.5 mt-1 rounded-lg bg-gray-50 border text-gray-900 hover:bg-blue-500 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-min text-sm border-gray-300 font-semibold'
              onClick={handleSubmit}
            >Create Account</button>
          </div>
        </div>
      </div>
      <ToastContainer position='top-right' theme='light' autoClose={5000} />
    </>
  )
}

export default SignupPage
