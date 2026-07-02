'use client';
import React, { useState, useEffect, useMemo } from 'react';
import {
  Button,
  TextField,
  Label,
  Input,
  FieldError,
  Select,
  ListBox,
  toast,
} from '@heroui/react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';

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

export default function DonorProfileEditor({ donor }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [fullName, setFullName] = useState(donor?.name || '');
  const [bloodGroup, setBloodGroup] = useState(donor?.bloodGroup || '');

  // Exact same state shape as create-request page
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedDistrictName, setSelectedDistrictName] = useState('');
  const [selectedUpazilaName, setSelectedUpazilaName] = useState('');
  const [allUpazilas, setAllUpazilas] = useState([]);

  // Exact same data loading as create-request page
  useEffect(() => {
    const loadData = async () => {
      try {
        const districtResponse = await fetch('/districts.json');
        const districtData = await districtResponse.json();
        const districtsList = districtData[2]?.data || [];
        setDistricts(districtsList);

        const upazilaResponse = await fetch('/upazilas.json');
        const upazilaData = await upazilaResponse.json();
        const upazilasList = upazilaData[2]?.data || [];
        setAllUpazilas(upazilasList);

        // Pre-select donor's saved district so upazila list is ready in edit mode
        if (donor?.district) {
          const matched = districtsList.find((d) => d.name === donor.district);
          if (matched) {
            setSelectedDistrict(String(matched.id));
            setSelectedDistrictName(matched.name);
          }
        }
        if (donor?.upazila) {
          setSelectedUpazilaName(donor.upazila);
        }
      } catch (error) {
        console.error('Error loading location data:', error);
      }
    };
    loadData();
  }, []);

  // Exact same filter logic as create-request page
  const upazilas = useMemo(() => {
    if (selectedDistrict) {
      return allUpazilas.filter(
        (upazila) => upazila.district_id === String(selectedDistrict)
      );
    }
    return [];
  }, [selectedDistrict, allUpazilas]);

  const isEligible = donor?.isEligible ?? true;

  const handleCancel = () => {
    setFullName(donor?.name || '');
    setBloodGroup(donor?.bloodGroup || '');
    // Restore saved district/upazila
    if (donor?.district) {
      const matched = districts.find((d) => d.name === donor.district);
      if (matched) {
        setSelectedDistrict(String(matched.id));
        setSelectedDistrictName(matched.name);
      }
    } else {
      setSelectedDistrict('');
      setSelectedDistrictName('');
    }
    setSelectedUpazilaName(donor?.upazila || '');
    setIsEditing(false);
  };

  const handleSave = async (e) => {
        const name = e.target.name.value;
        const bloodGroup = e.target.bloodGroup.value;
        const district = e.target.district.value;
        const upazila = e.target.upazila.value;

        console.log({ name, bloodGroup, district, upazila });

        const result = await authClient.updateUser({
            name,
            bloodGroup,
            district,
            upazila,
        });
        console.log('Update result:', result);

        if (result?.data) {
            toast.success("Profile updated successfully");
            setIsEditing(false);
        } else if (result?.error) {
            toast.error("Error updating profile: " + result.error.message);
            // console.error("Error updating profile:", result.error);
        }


        // refreshData(`/dashboard/${user}`); 
    };

  return (
    <div className="min-h-screen bg-[#fafafa] p-6 md:p-8">
      <div className="mx-auto max-w-4xl">
        <form onSubmit={handleSave}>
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-3xl font-extrabold text-black">
              Profile <span className="text-red-600">Settings</span>
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage your personal information and donor credentials.
            </p>
          </div>
          {isEditing ? (
            <div className="flex gap-3">
              <Button variant="flat" isDisabled={isSaving} onPress={handleCancel} className="font-medium text-gray-500 hover:text-gray-700">
                Cancel
              </Button>
              <Button color="danger" isLoading={isSaving} type="submit"  className="font-semibold">
                <Icon icon="mdi:content-save-outline" className="mr-1.5" />
                Save Changes
              </Button>
            </div>
          ) : (
            <Button onPress={() => setIsEditing(true)} className="font-medium bg-[#c1121f] hover:bg-[#780000] text-white">
              <Icon icon="mdi:pencil-outline" className="mr-1.5" />
              Edit Profile
            </Button>
          )}
        </div>

        {/* Profile card */}
        <div className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">

          {/* Banner */}
          <div
            className="relative h-36 md:h-40"
            style={{
              background:
                'radial-gradient(circle at 0 0, rgba(255,255,255,0.04) 1px, transparent 1px) 0 0/14px 14px, linear-gradient(135deg, #3d0a0a, #1a0404)',
            }}
          >
            <div className="absolute right-5 top-5 rounded-xl border border-red-300/40 bg-white/90 px-4 py-2 text-center backdrop-blur-sm">
              <p className="text-[10px] font-bold tracking-wide text-red-500">BLOOD GROUP</p>
              <p className="text-xl font-black text-red-600">{bloodGroup || '—'}</p>
            </div>
          </div>

          {/* Avatar + name */}
          <div className="relative px-6">
            <div className="flex items-end gap-4 -mt-6">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
                <Image
                  width={96} height={96}
                  src={donor?.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName || 'Donor')}&background=8FA1B9&color=000&bold=true`}
                  alt="Avatar"
                  className="object-cover w-full h-full rounded-full"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1 pb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-2xl font-extrabold text-black">{fullName || 'Donor'}</h2>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                    <Icon icon="mdi:check-circle" />
                    ACTIVE DONOR
                  </span>
                </div>
                <p className="flex items-center gap-1 text-sm text-slate-500">
                  <Icon icon="mdi:map-marker" className="text-red-400" />
                  {selectedUpazilaName || '—'}, {selectedDistrictName || '—'}
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="grid grid-cols-1 gap-8 px-6 pb-8 pt-8 md:grid-cols-[1fr_300px]">

            {/* Left column */}
            <div className="flex flex-col gap-8">

              {/* Personal Information */}
              <section>
                <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-black">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50">
                    <Icon icon="mdi:account-outline" className="text-red-500" />
                  </span>
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <TextField name='name' isDisabled={!isEditing} value={fullName} onChange={setFullName}>
                    <Label className="text-xs font-semibold uppercase tracking-wide text-slate-400">Full Name</Label>
                    <Input className={`rounded-lg text-sm ${isEditing ? 'border border-red-200 bg-white' : 'border border-transparent bg-slate-50'} text-black`} />
                    <FieldError />
                  </TextField>

                  <TextField isDisabled value={donor?.email || ''}>
                    <Label className="text-xs font-semibold uppercase tracking-wide text-slate-400">Email (Fixed)</Label>
                    <Input
                      className="rounded-lg border border-transparent bg-slate-50 text-sm text-slate-400"
                    />
                  </TextField>
                </div>
              </section>

              {/* Address Details */}
              <section>
                <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-black">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50">
                    <Icon icon="mdi:map-marker-outline" className="text-red-500" />
                  </span>
                  Address Details
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  {/* District — copied exactly from create-request page */}
                  {isEditing ? (
                    <Select
                        defaultValue={donor?.district}
                        name="district"
                      placeholder="Select District"
                      className="w-full"
                      onChange={(key) => {
                        const selectedValue = key ? String(key) : '';
                        setSelectedDistrict(selectedValue);
                        const district = districts.find((item) => String(item.id) === selectedValue);
                        setSelectedDistrictName(district?.name || '');
                        setSelectedUpazilaName(''); // Reset upazila when district changes
                      }}
                    >
                      <Label className="text-xs font-semibold uppercase tracking-wide text-slate-400">District</Label>
                      <Select.Trigger className="bg-white border border-red-200 rounded-lg px-3 py-2 text-sm text-black">
                        <Select.Value />
                        <Select.Indicator>
                          <Icon icon="mdi:chevron-down" className="text-slate-400" />
                        </Select.Indicator>
                      </Select.Trigger>
                      <Select.Popover className="border border-slate-200 bg-white">
                        <ListBox className='bg-gray-200'>
                          {districts.map((d) => (
                            <ListBox.Item
                              key={d.id}
                              id={d.name}
                              textValue={d.name}
                              className="hover:bg-red-50 text-black"
                            >
                              <div className="flex items-center gap-2">
                                <Icon icon="mdi:map-marker" className="text-slate-400" />
                                {d.name}
                              </div>
                              <ListBox.ItemIndicator>
                                <Icon icon="mdi:check" className="text-red-500" />
                              </ListBox.ItemIndicator>
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  ) : (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">District</p>
                      <p className="mt-1 rounded-lg bg-slate-50 px-3 py-2 text-sm font-medium text-black">{selectedDistrictName || '—'}</p>
                    </div>
                  )}

                  {/* Upazila — copied exactly from create-request page */}
                  {isEditing ? (
                    <Select
                        defaultValue={donor?.upazila}
                        name="upazila"
                      placeholder="Select Upazila"
                      className="w-full"
                      isDisabled={!selectedDistrict}
                      onSelectionChange={(key) => {
                            const selectedValue = key ? String(key) : '';
                            setSelectedUpazilaName(selectedValue);
                        }}
                    >
                      <Label className="text-xs font-semibold uppercase tracking-wide text-slate-400">Upazila</Label>
                      <Select.Trigger className="bg-white border border-red-200 rounded-lg px-3 py-2 text-sm text-black">
                        <Select.Value />
                        <Select.Indicator>
                          <Icon icon="mdi:chevron-down" className="text-slate-400" />
                        </Select.Indicator>
                      </Select.Trigger>
                      <Select.Popover className="border border-slate-200 bg-white">
                        <ListBox>
                          {upazilas.length > 0 ? (
                            upazilas.map((u) => (
                              <ListBox.Item
                                key={u.id}
                                id={u.name}
                                textValue={u.name}
                                className="hover:bg-red-50 text-black"
                              >
                                <div className="flex items-center gap-2">
                                  <Icon icon="mdi:map-marker-radius" className="text-slate-400" />
                                  {u.name}
                                </div>
                                <ListBox.ItemIndicator>
                                  <Icon icon="mdi:check" className="text-red-500" />
                                </ListBox.ItemIndicator>
                              </ListBox.Item>
                            ))
                          ) : (
                            <ListBox.Item key="empty" id="empty" textValue="Select a district first" isDisabled className="text-slate-400">
                              Select a district first
                            </ListBox.Item>
                          )}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  ) : (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Upazila</p>
                      <p className="mt-1 rounded-lg bg-slate-50 px-3 py-2 text-sm font-medium text-black">{selectedUpazilaName || '—'}</p>
                    </div>
                  )}

                </div>
              </section>
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-4">
              <div className="rounded-xl bg-slate-50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-black">
                  <Icon icon="mdi:water" className="text-red-500" />
                  Medical Profile
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Blood Group</p>

                {/* Blood group — same Select pattern */}
                {isEditing ? (
                  <Select
                    defaultValue={bloodGroup}
                    label="Blood Group"
                    name="bloodGroup"
                    placeholder="Select Group"
                    className="w-full mt-1"
                    onChange={(key) => {
                      setBloodGroup(key ? String(key) : '');
                    }}
                  >
                    <Select.Trigger className="bg-white border border-red-200 rounded-lg px-3 py-2 text-sm font-bold text-red-600">
                      <Select.Value />
                      <Select.Indicator>
                        <Icon icon="mdi:chevron-down" className="text-slate-400" />
                      </Select.Indicator>
                    </Select.Trigger>
                    <Select.Popover className="border border-slate-200 bg-white">
                      <ListBox>
                        {BLOOD_GROUPS.map((g) => (
                          <ListBox.Item key={g.value} id={g.value} textValue={g.label} className="hover:bg-red-50">
                            <div className="flex items-center gap-2">
                              <Icon icon="healthicons:blood-drop" className="text-red-400" />
                              {g.label}
                            </div>
                            <ListBox.ItemIndicator>
                              <Icon icon="mdi:check" className="text-red-500" />
                            </ListBox.ItemIndicator>
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                ) : (
                  <p className="mt-1 rounded-lg border border-red-100 bg-white px-3 py-2 text-sm font-bold text-red-600">
                    {bloodGroup || '—'}
                  </p>
                )}
              </div>

              <div className={`rounded-xl border p-5 ${isEligible ? 'border-emerald-100 bg-emerald-50/40' : 'border-amber-100 bg-amber-50/40'}`}>
                <h4 className="text-sm font-bold text-black">
                  {isEligible ? 'Eligible to Donate' : 'Not Yet Eligible'}
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                  {isEligible
                    ? 'Your account is in good standing. You are ready to save lives.'
                    : 'Check your last donation date — there may be a waiting period before you can donate again.'}
                </p>
              </div>
            </div>
          </div>
        </div>
        </form>
      </div>
    </div>
  );
}