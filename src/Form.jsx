import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';


const Form = () => {

    const [formData, setformData] = useState({

        uname: '',
        uemail: '',
        ufon: '',
        umessage: ''

    })


    const [submitdata, setSubmitdata] = useState(JSON.parse(localStorage.getItem("userinfo")) ?? [])

    const [editIndex, setEditIndex] = useState(null)


    let getInputvalue = (event) => {

        //event.preventDefault()
        let oldData = { ...formData }
        let inputName = event.target.name
        let inputValue = event.target.value
        oldData[inputName] = inputValue


        setformData(oldData)

    }

    const onsubmitdata = (event) => {
        event.preventDefault()
        let olduserlist = [...submitdata]
        if (editIndex === null) {

            olduserlist.push(formData)

            setSubmitdata(olduserlist)

            setformData(
                {
                    uname: '',
                    uemail: '',
                    ufon: '',
                    umessage: ''
                }
            )
            toast.success("data save successfully...");

        }
        else {
            olduserlist[editIndex] = formData
            setSubmitdata(olduserlist)
            setformData(
                {
                    uname: '',
                    uemail: '',
                    ufon: '',
                    umessage: ''
                }
            )
            toast.success("update successfully...");
            setEditIndex(null)
        }


    }

    let deletrow = (indaxvalue) => {

        let userfilterdata = submitdata.filter((v, i) => indaxvalue != i)
        setSubmitdata(userfilterdata)
        toast.success("data deleted successfully...");

        // if (window.confirm("aru you sure want to delet data")) {

        //     let listolddata = [...submitdata]
        //     listolddata.splice(indaxvalue, 1)
        //     setSubmitdata(listolddata)
        //     toast.success("data deleted...");
        // }

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }


    useEffect(() => {
        localStorage.setItem("userinfo", JSON.stringify(submitdata))
    }, [submitdata])

    const edit_row = (currentindex) => {
        let editRowDEtails = submitdata[currentindex]
        setformData(editRowDEtails)
        setEditIndex(currentindex)
    }

    return (
        <>
            <div className='py-2 bg-slate-100 grid grid-cols-[30%_auto]'>
                <div className=''>
                    <ToastContainer />
                    <div class="max-w-screen-md mx-auto p-5 ">
                        <form class="bg-white rounded-[5px] p-5 mx-5" onSubmit={onsubmitdata} >
                            <h3 className='text-center text-[24px] font-bold text-[#d11bf9] pt-[10px]'>Enquary Now</h3>
                            <div class="flex flex-wrap -mx-3 mb-3">
                                <div class="w-full mb-3 md:mb-0">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                        Name
                                    </label>
                                    <input name='uname' value={formData.uname} class="appearance-none block w-full bg-gray-200 text-gray-700  rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="enter your name"
                                        onChange={getInputvalue}
                                    />
                                </div>
                                <div class="w-full px-3">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                        Phone
                                    </label>
                                    <input name='uemail' value={formData.uemail} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder='enter your number'
                                        onChange={getInputvalue}
                                    />
                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-3">
                                <div class="w-full px-3">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                        Email Address
                                    </label>
                                    <input name='ufon' value={formData.ufon} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder='enter your email '
                                        onChange={getInputvalue}
                                    />
                                </div>
                            </div>

                            <div class="flex flex-wrap -mx-3 mb-3">
                                <div class="w-full px-3">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                        Your Message
                                    </label>
                                    <textarea name='umessage' value={formData.umessage} rows="5" placeholder='type your message' class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        onChange={getInputvalue}

                                    >
                                    </textarea>
                                </div>
                                <div class="flex justify-between w-full px-3">
                                    <button class="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded" type="submit">
                                        {editIndex !== null ? 'Update Value Now' : 'Send Message'}
                                    </button>
                                </div>

                            </div>

                        </form>
                    </div>
                </div>


                {/* table part */}

                <div className=''>

                    <br />

                    <div class="py-8">

                        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div
                                class="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
                            >
                                <table class="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                            >
                                                Id
                                            </th>
                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                            >
                                                Name
                                            </th>
                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                            >
                                                Email
                                            </th>

                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                            >
                                                Message
                                            </th>
                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                            >
                                                Phone
                                            </th>
                                            <th
                                                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                            >
                                                <b>Delet</b> | <b>Edit</b>
                                            </th>


                                        </tr>
                                    </thead>
                                    <tbody>

                                        {submitdata.length >= 1 ?
                                            submitdata.map((items, index) => {
                                                return (
                                                    <tr>
                                                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">

                                                            <p className='text-gray-600whitespace-no-wrap'>
                                                                {index + 1}
                                                            </p>

                                                        </td>
                                                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                            <p class="text-gray-600 whitespace-no-wrap">{items.uname}</p>
                                                        </td>
                                                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">

                                                            <p class="text-gray-600 whitespace-no-wrap">{items.uemail}</p>
                                                        </td>
                                                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                            <span
                                                                class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                                            >
                                                                <span
                                                                    aria-hidden
                                                                    class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                                                ></span>
                                                                <span class="relative">{items.umessage}</span>
                                                            </span>
                                                        </td>
                                                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                            <span
                                                                class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                                            >
                                                                <span
                                                                    aria-hidden
                                                                    class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                                                ></span>
                                                                <span class="relative">{items.ufon}</span>
                                                            </span>
                                                        </td>
                                                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                            <span
                                                                class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                                                            >
                                                                <span
                                                                    aria-hidden
                                                                    class="absolute inset-0 bg-green-200 opacity-50 rounded-full w-[100px]"
                                                                ></span>
                                                                <span class="relative ">
                                                                    <p className='absolute gap-5'
                                                                        onClick={() => deletrow(index)}
                                                                       
                                                                    >Delet</p>
                                                                    <p onClick={() => edit_row(index)} className='px-[40px]' >Edit</p>
                                                                </span>
                                                            </span>
                                                        </td>
                                                        <td
                                                            class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right"
                                                        >
                                                            <button
                                                                type="button"
                                                                class="inline-block text-gray-500 hover:text-gray-700"
                                                            >
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })

                                            :

                                            ""}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Form