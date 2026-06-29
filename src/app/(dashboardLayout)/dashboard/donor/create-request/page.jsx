'use client';
import React, { useState, useEffect, useMemo } from 'react';
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
  toast,
} from '@heroui/react';
import { Icon } from '@iconify/react';

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
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedDistrictName, setSelectedDistrictName] = useState('');
  const [selectedUpazilaName, setSelectedUpazilaName] = useState('');
  const [allUpazilas, setAllUpazilas] = useState([]);
  const [validationMessage, setValidationMessage] = useState('');

  // Load districts and upazilas from JSON files
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load districts
        const districtResponse = await fetch('/districts.json');
        const districtData = await districtResponse.json();
        const districtsList = districtData[2]?.data || [];
        setDistricts(districtsList);

        // Load all upazilas
        const upazilaResponse = await fetch('/upazilas.json');
        const upazilaData = await upazilaResponse.json();
        const upazilasList = upazilaData[2]?.data || [];
        setAllUpazilas(upazilasList);
      } catch (error) {
        console.error('Error loading location data:', error);
      }
    };

    loadData();
  }, []);

  // Filter upazilas when district changes
  const upazilas = useMemo(() => {
    if (selectedDistrict) {
      return allUpazilas.filter(
        (upazila) => upazila.district_id === String(selectedDistrict)
      );
    }
    return [];
  }, [selectedDistrict, allUpazilas]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationMessage('');

    const formData = new FormData(e.currentTarget);
    const formInputData = Object.fromEntries(formData.entries());
    const payload = {
      ...formInputData,
      district: selectedDistrictName || formInputData.district || '',
      upazila: selectedUpazilaName || formInputData.upazila || '',
    };

    const requiredFields = {
      requesterName: payload.requesterName?.trim(),
      requesterEmail: payload.requesterEmail?.trim(),
      recipientName: payload.recipientName?.trim(),
      bloodGroup: payload.bloodGroup?.trim(),
      district: payload.district?.trim(),
      upazila: payload.upazila?.trim(),
      hospitalName: payload.hospitalName?.trim(),
      hospitalAddress: payload.hospitalAddress?.trim(),
      requiredDate: payload.requiredDate?.trim(),
      requiredTime: payload.requiredTime?.trim(),
      requestMessage: payload.requestMessage?.trim(),
    };

    const missingField = Object.entries(requiredFields).find(([, value]) => !value);
    if (missingField) {
      setValidationMessage('Please fill in all required fields.');
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard/donor/create-request`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        // "authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    console.log(data);

    if (data) {
        toast.success("Donation request created successfully!");
    }
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
          {validationMessage && (
            <div className="mb-4 rounded border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {validationMessage}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Requester Info */}
            <section>
              <h2 className="text-lg font-semibold text-[#669bbc] mb-4 flex items-center gap-2">
                <Icon icon="mdi:account" className=" text-[#669bbc]" />
                Requester Info
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField 
                  isRequired
                  name="requesterName"
                  className="w-full"
                >
                  <Label className="text-default-400">Your Name</Label>
                  <Input 
                    placeholder="Enter your full name" 
                    variant="bordered"
                    className="text-default-400"
                  />
                  <FieldError />
                </TextField>
                
                <TextField 
                  isRequired
                  name="requesterEmail"
                  className="w-full"
                >
                  <Label className="text-default-400">Your Email</Label>
                  <Input 
                    placeholder="Enter your email" 
                    variant="bordered"
                    className="text-default-400"
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
                  isRequired
                  name="recipientName"
                  className="w-full"
                >
                  <Label className="text-default-400">Recipient Name</Label>
                  <Input 
                    placeholder="Enter full name" 
                    variant="bordered"
                    className="text-default-400"
                  />
                  <FieldError />
                </TextField>

                {/* Blood Group Select - Hero UI v3: value/onChange, not selectedKeys/onSelectionChange */}
                <Select 
                  isRequired
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
                  isRequired
                  placeholder="Select District"
                  className="w-full"
                  name='district'
                  onSelectionChange={(key) => {
                    const selectedValue = key ? String(key) : '';
                    setSelectedDistrict(selectedValue);
                    const district = districts.find((item) => String(item.id) === selectedValue);
                    setSelectedDistrictName(district?.name || '');
                    setSelectedUpazilaName('');
                  }}
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
                      {districts.map((d) => (
                        <ListBox.Item 
                          key={d.id} 
                          id={String(d.id)} 
                          textValue={d.name}
                          className="hover:bg-red-200/10 data-[selected=true]:bg-primary-500/20"
                        >
                          <div className="flex items-center gap-2">
                            <Icon icon="mdi:map-marker" className="text-default-400" />
                            {d.name}
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
                  isRequired
                  placeholder="Select Upazila"
                  className="w-full"
                  name='upazila'
                  isDisabled={!selectedDistrict}
                  onSelectionChange={(key) => {
                    setSelectedUpazilaName(key ? String(key) : '');
                  }}
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
                      {upazilas.length > 0 ? (
                        upazilas.map((u) => (
                          <ListBox.Item 
                            key={u.id} 
                            id={u.name} 
                            textValue={u.name}
                            className="hover:bg-red-200/10 data-[selected=true]:bg-primary-500/20"
                          >
                            <div className="flex items-center gap-2">
                              <Icon icon="mdi:map-marker-radius" className="text-default-400" />
                              {u.name}
                            </div>
                            <ListBox.ItemIndicator>
                              <Icon icon="mdi:check" className="text-primary-500" />
                            </ListBox.ItemIndicator>
                          </ListBox.Item>
                        ))
                      ) : (
                        <ListBox.Item 
                          key="empty" 
                          id="empty" 
                          textValue="Select a district first"
                          isDisabled
                          className="text-default-400"
                        >
                          Select a district first
                        </ListBox.Item>
                      )}
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
                  isRequired
                  name="hospitalName"
                  className="w-full"
                >
                  <Label className="text-default-400">Hospital Name</Label>
                  <Input 
                    placeholder="Enter hospital name" 
                    variant="bordered"
                    className="text-default-400"
                  />
                  <FieldError />
                </TextField>

                <TextField 
                  isRequired
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
                  isRequired
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
                  isRequired
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
                isRequired
                name="requestMessage"
                className="w-full"
              >
                <Label className="text-default-400">Message</Label>
                <TextArea 
                  placeholder="Provide any additional details or special instructions"
                  variant="bordered"
                  className="text-default-400 min-h-30"
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