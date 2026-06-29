'use client';
import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  Separator,
  TextField,
  Label,
  Input,
  FieldError,
  Select,
  ListBox,
  TextArea,
} from '@heroui/react';
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-8">
      <Card className="max-w-4xl mx-auto bg-default-100/10 backdrop-blur-sm border border-default-200/20 shadow-xl">
        {/* Using plain divs here instead of Card.Header/Card.Body/Card.Content
            because that sub-API has changed across HeroUI v3 alpha/beta/stable
            releases (Card.Body vs Card.Content). Plain divs avoid the mismatch
            entirely and look identical. */}
        <div className="flex flex-col items-start gap-2 px-6 pt-6 pb-4">
          <div className="flex items-center gap-3">
            <Icon icon="mdi:blood-bag" className="text-red-500 text-3xl" />
            <h1 className="text-2xl font-bold text-slate-500">New Donation Request</h1>
          </div>
          <p className="text-slate-400 text-sm">
            Complete the form below to broadcast an urgent request to the donor community.
          </p>
        </div>
        <Separator className="bg-default-200/20" />
        <div className="px-6 py-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Requester Info */}
            <section>
              <h2 className="text-lg font-semibold text-[#669bbc] mb-4 flex items-center gap-2">
                <Icon icon="mdi:account" className=" text-[#669bbc]" />
                Requester Info
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField 
                  name="requesterName"
                  className="w-full"
                >
                  <Label className="text-default-400">Your Name</Label>
                  <Input 
                    placeholder="Enter your full name" 
                    variant="bordered"
                    className="text-white"
                  />
                  <FieldError />
                </TextField>
                
                <TextField 
                  name="requesterEmail"
                  className="w-full"
                >
                  <Label className="text-default-400">Your Email</Label>
                  <Input 
                    placeholder="Enter your email" 
                    variant="bordered"
                    className="text-white"
                  />
                  <FieldError />
                </TextField>
              </div>
            </section>

            {/* Patient Details */}
            <section>
              <h2 className="text-lg font-semibold text-[#669bbc] mb-4 flex items-center gap-2">
                <Icon icon="mdi:patient" className=" text-[#669bbc]" />
                Patient Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField 
                  name="recipientName"
                  className="w-full"
                >
                  <Label className="text-default-400">Recipient Name</Label>
                  <Input 
                    placeholder="Enter full name" 
                    variant="bordered"
                    className="text-white"
                  />
                  <FieldError />
                </TextField>

                {/* Blood Group Select - Hero UI v3: value/onChange, not selectedKeys/onSelectionChange */}
                <Select 
                  placeholder="Select Group"
                  className="w-full"
                  name='bloodGroup'
                >
                  <Label className="text-default-400">Blood Group Needed</Label>
                  <Select.Trigger className="bg-transparent border border-default-200/30 rounded-lg px-3 py-2">
                    <Select.Value />
                    <Select.Indicator>
                      <Icon icon="mdi:chevron-down" className="text-default-400" />
                    </Select.Indicator>
                  </Select.Trigger>
                  <Select.Popover className="bg-black border border-default-200/20">
                    <ListBox className="text-white">
                      {BLOOD_GROUPS.map((group) => (
                        <ListBox.Item 
                          key={group.value} 
                          id={group.value} 
                          textValue={group.label}
                          className="hover:bg-red-200/10 "
                        >
                          <div className="flex items-center gap-2">
                            <Icon icon="healthicons:blood-drop" className="text-danger-400" />
                            {group.label}
                          </div>
                          <ListBox.ItemIndicator>
                            <Icon icon="mdi:check" className="text-danger-500" />
                          </ListBox.ItemIndicator>
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>

                {/* District Select - Hero UI v3 */}
                <Select
                  placeholder="Select District"
                  className="w-full"
                  name='district'
                >
                  <Label className="text-default-400">District</Label>
                  <Select.Trigger className="bg-transparent border border-default-200/30 rounded-lg px-3 py-2">
                    <Select.Value />
                    <Select.Indicator>
                      <Icon icon="mdi:chevron-down" className="text-default-400" />
                    </Select.Indicator>
                  </Select.Trigger>
                  <Select.Popover className="bg-black border border-default-200/20">
                    <ListBox className="text-white">
                      {DISTRICTS.map((d) => (
                        <ListBox.Item 
                          key={d.value} 
                          id={d.value} 
                          textValue={d.label}
                          className="hover:bg-red-200/10 data-[selected=true]:bg-primary-500/20"
                        >
                          <div className="flex items-center gap-2">
                            <Icon icon="mdi:map-marker" className="text-default-400" />
                            {d.label}
                          </div>
                          <ListBox.ItemIndicator>
                            <Icon icon="mdi:check" className="text-primary-500" />
                          </ListBox.ItemIndicator>
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>

                {/* Upazila Select - Hero UI v3 */}
                <Select
                  placeholder="Select Upazila"
                  className="w-full"
                  name='upazila'
                >
                  <Label className="text-default-400">Upazila</Label>
                  <Select.Trigger className="bg-transparent border border-default-200/30 rounded-lg px-3 py-2">
                    <Select.Value />
                    <Select.Indicator>
                      <Icon icon="mdi:chevron-down" className="text-default-400" />
                    </Select.Indicator>
                  </Select.Trigger>
                  <Select.Popover className="bg-black border border-default-200/20">
                    <ListBox className="text-white">
                      {UPAZILAS.map((u) => (
                        <ListBox.Item 
                          key={u.value} 
                          id={u.value} 
                          textValue={u.label}
                          className="hover:bg-red-200/10 data-[selected=true]:bg-primary-500/20"
                        >
                          <div className="flex items-center gap-2">
                            <Icon icon="mdi:map-marker-radius" className="text-default-400" />
                            {u.label}
                          </div>
                          <ListBox.ItemIndicator>
                            <Icon icon="mdi:check" className="text-primary-500" />
                          </ListBox.ItemIndicator>
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </section>

            {/* Hospital & Timing */}
            <section>
              <h2 className="text-lg font-semibold text-[#669bbc] mb-4 flex items-center gap-2">
                <Icon icon="mdi:hospital" className=" text-[#669bbc]" />
                Hospital & Timing
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField 
                  name="hospitalName"
                  className="w-full"
                >
                  <Label className="text-default-400">Hospital Name</Label>
                  <Input 
                    placeholder="Enter hospital name" 
                    variant="bordered"
                    className="text-white"
                  />
                  <FieldError />
                </TextField>

                <TextField 
                  name="hospitalAddress"
                  className="w-full"
                >
                  <Label className="text-default-400">Full Address</Label>
                  <Input 
                    placeholder="Street / Ward / Area" 
                    variant="bordered"
                    className="text-white"
                     
                  />
                  <FieldError />
                </TextField>

                <TextField 
                  name="requiredDate"
                  type="date"
                  className="w-full"
                >
                  <Label className="text-default-400">Required Date</Label>
                  <Input 
                    variant="bordered"
                    className="text-[#669bbc]"
                  />
                  <FieldError />
                </TextField>

                <TextField 
                  name="requiredTime"
                  type="time"
                  className="w-full"
                >
                  <Label className="text-default-400">Required Time</Label>
                  <Input 
                    variant="bordered"
                    className="text-[#669bbc]"
                  />
                  <FieldError />
                </TextField>
              </div>
            </section>

            {/* Request Message */}
            <section>
              <h2 className="text-lg font-semibold text-[#669bbc] mb-4 flex items-center gap-2">
                <Icon icon="mdi:message-text" className=" text-[#669bbc]" />
                Request Message
              </h2>
              <TextField 
                name="requestMessage"
                className="w-full"
              >
                <Label className="text-default-400">Message</Label>
                <TextArea 
                  placeholder="Provide any additional details or special instructions"
                  variant="bordered"
                  className="text-red-400 min-h-[120px]"
                />
                <FieldError />
              </TextField>
            </section>

            {/* Action Buttons */}
            <Separator className="bg-default-200/20" />
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="flat"
                color="default"
                className="text-[#669bbc] border border-[#669bbc]"
                onPress={() => {
                  console.log('Cancel');
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="danger"
                className="font-semibold"
              >
                Create Donation Request
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}