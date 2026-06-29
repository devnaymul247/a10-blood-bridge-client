'use client';
import { useState } from 'react';
import { Card, Input, Button, } from '@heroui/react';
import { Icon } from '@iconify/react';

// Mock data for demonstration
const DISTRICTS = [
  { value: 'dhaka', label: 'Dhaka' },
  { value: 'noakhali', label: 'Noakhali' },
  { value: 'chittagong', label: 'Chittagong' },
  { value: 'sylhet', label: 'Sylhet' },
];

const UPAZILAS = [
  { value: 'sadar', label: 'Sadar' },
  { value: 'begumganj', label: 'Begumganj' },
  { value: 'chatkhil', label: 'Chatkhil' },
  { value: 'sonaimuri', label: 'Sonaimuri' },
];

const BLOOD_GROUPS = [
  { value: 'A+', label: 'A+' },
  { value: 'A-', label: 'A-' },
  { value: 'B+', label: 'B+' },
  { value: 'B-', label: 'B-' },
  { value: 'AB+', label: 'AB+' },
  { value: 'AB-', label: 'AB-' },
  { value: 'O+', label: 'O+' },
  { value: 'O-', label: 'O-' },
];

export default function CreateDonationRequest() {
  // Form state
  const [requesterName, setRequesterName] = useState('Donor');
  const [requesterEmail, setRequesterEmail] = useState('donor@gmail.com');
  const [recipientName, setRecipientName] = useState('Akbor');
  const [bloodGroup, setBloodGroup] = useState('');
  const [district, setDistrict] = useState('Noakhali');
  const [upazila, setUpazila] = useState('');
  const [hospitalName, setHospitalName] = useState('Hospital 1');
  const [hospitalAddress, setHospitalAddress] = useState('');
  const [requiredDate, setRequiredDate] = useState('2026-06-13');
  const [requiredTime, setRequiredTime] = useState('16:00');
  const [requestMessage, setRequestMessage] = useState('Some reason');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      requesterName,
      requesterEmail,
      recipientName,
      bloodGroup,
      district,
      upazila,
      hospitalName,
      hospitalAddress,
      requiredDate,
      requiredTime,
      requestMessage,
    });
    alert('Donation request created successfully!');
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-8">
      <Card className="max-w-4xl mx-auto bg-default-100/10 backdrop-blur-sm border border-default-200/20 shadow-xl">
        <Card.Header className="flex flex-col items-start gap-2 px-6 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <Icon icon="mdi:blood-bag" className="text-danger-500 text-3xl" />
            <h1 className="text-2xl font-bold text-white">New Donation Request</h1>
          </div>
          <p className="text-default-400 text-sm">
            Complete the form below to broadcast an urgent request to the donor community.
          </p>
        </Card.Header>
        <Card.Body className="px-6 py-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Requester Info */}
            <section>
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Icon icon="mdi:account" className="text-primary-400" />
                Requester Info
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Your Name"
                  placeholder="Enter your full name"
                  value={requesterName}
                  onValueChange={setRequesterName}
                  variant="bordered"
                  classNames={{
                    input: "text-white",
                    label: "text-default-400",
                  }}
                  startContent={<Icon icon="mdi:account-outline" className="text-default-400" />}
                />
                <Input
                  label="Your Email"
                  placeholder="Enter your email"
                  value={requesterEmail}
                  onValueChange={setRequesterEmail}
                  variant="bordered"
                  classNames={{
                    input: "text-white",
                    label: "text-default-400",
                  }}
                  startContent={<Icon icon="mdi:email-outline" className="text-default-400" />}
                />
              </div>
            </section>

            {/* Patient Details */}
            <section>
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Icon icon="mdi:patient" className="text-primary-400" />
                Patient Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Recipient Name"
                  placeholder="Enter full name"
                  value={recipientName}
                  onValueChange={setRecipientName}
                  variant="bordered"
                  classNames={{
                    input: "text-white",
                    label: "text-default-400",
                  }}
                  startContent={<Icon icon="mdi:account" className="text-default-400" />}
                />
                
                {/* Blood Group Select - Custom dropdown */}
                <div className="relative">
                  <label className="text-default-400 text-sm block mb-1">Blood Group Needed</label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full bg-transparent border border-default-200/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-danger-500"
                  >
                    <option value="">Select Group</option>
                    {BLOOD_GROUPS.map((group) => (
                      <option key={group.value} value={group.value} className="bg-black">
                        {group.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* District Select - Custom dropdown */}
                <div className="relative">
                  <label className="text-default-400 text-sm block mb-1">District</label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-transparent border border-default-200/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary-500"
                  >
                    <option value="">Select District</option>
                    {DISTRICTS.map((d) => (
                      <option key={d.value} value={d.value} className="bg-black">
                        {d.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Upazila Select - Custom dropdown */}
                <div className="relative">
                  <label className="text-default-400 text-sm block mb-1">Upazila</label>
                  <select
                    value={upazila}
                    onChange={(e) => setUpazila(e.target.value)}
                    className="w-full bg-transparent border border-default-200/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary-500"
                  >
                    <option value="">Select Upazila</option>
                    {UPAZILAS.map((u) => (
                      <option key={u.value} value={u.value} className="bg-black">
                        {u.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            {/* Hospital & Timing */}
            <section>
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Icon icon="mdi:hospital" className="text-primary-400" />
                Hospital & Timing
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Hospital Name"
                  placeholder="Enter hospital name"
                  value={hospitalName}
                  onValueChange={setHospitalName}
                  variant="bordered"
                  classNames={{
                    input: "text-white",
                    label: "text-default-400",
                  }}
                  startContent={<Icon icon="mdi:hospital-building" className="text-default-400" />}
                />
                <Input
                  label="Full Address"
                  placeholder="Street / Ward / Area"
                  value={hospitalAddress}
                  onValueChange={setHospitalAddress}
                  variant="bordered"
                  classNames={{
                    input: "text-white",
                    label: "text-default-400",
                  }}
                  startContent={<Icon icon="mdi:map-marker-outline" className="text-default-400" />}
                />
                <Input
                  label="Required Date"
                  type="date"
                  value={requiredDate}
                  onValueChange={setRequiredDate}
                  variant="bordered"
                  classNames={{
                    input: "text-white",
                    label: "text-default-400",
                  }}
                  startContent={<Icon icon="mdi:calendar" className="text-default-400" />}
                />
                <Input
                  label="Required Time"
                  type="time"
                  value={requiredTime}
                  onValueChange={setRequiredTime}
                  variant="bordered"
                  classNames={{
                    input: "text-white",
                    label: "text-default-400",
                  }}
                  startContent={<Icon icon="mdi:clock-outline" className="text-default-400" />}
                />
              </div>
            </section>

            {/* Request Message */}
            <section>
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Icon icon="mdi:message-text" className="text-primary-400" />
                Request Message
              </h2>
              <textarea
                placeholder="Provide any additional details or special instructions"
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                className="w-full bg-transparent border border-default-200/30 rounded-lg px-3 py-2 text-white min-h-[120px] focus:outline-none focus:border-primary-500"
                rows="4"
              >
              </textarea>
            </section>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="flat"
                color="default"
                className="text-white border border-default-200/30"
                onPress={() => {
                  // Reset logic if needed
                  console.log('Cancel');
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="danger"
                className="font-semibold"
                startContent={<Icon icon="mdi:send" />}
              >
                Create Donation Request
              </Button>
            </div>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}