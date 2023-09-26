"use client"
import React, { useState } from 'react';
import UserTable from "../../components/user/userTable/UserTable";
import UserRegistration from "../../components/user/userRegistration/UserRegistration"
function UserManagement() {


  const [isModalOpen, setModalOpen] = useState(false);
  const [showtable, setShowtable] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">Users</h2>
            <p className="mt-1 text-sm text-gray-700">
              This is a list of all User. You can add new User, edit or delete existing
              ones.
            </p>
          </div>
          <div>
            <button
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={openModal}
            >
              Add new User
            </button>
          </div>
        </div>
        <UserRegistration isOpen={isModalOpen} onClose={closeModal} />

        <UserTable />

        <div className="mt-4 w-full border-gray-300">
          <div className="mt-2 flex items-center justify-end">
            <div className="space-x-2">
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                &larr; Previous
              </button>
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Next &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default UserManagement
