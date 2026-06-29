"use client";
import { useState, useEffect, useMemo } from "react";
import { FcGoogle } from "react-icons/fc";
import { Card, ListBox, Separator } from "@heroui/react";

import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
    Select,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import { HiArrowUpTray } from "react-icons/hi2";
import { Icon } from "@iconify/react";

const SignUpPage = () => {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validationError, setValidationError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [photoUrl, setPhotoUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [errors, setErrors] = useState({});

    // District and Upazila states
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedDistrictName, setSelectedDistrictName] = useState('');
    const [selectedUpazilaName, setSelectedUpazilaName] = useState('');
    const [allUpazilas, setAllUpazilas] = useState([]);

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

    const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Simple Validation
        if (file.size > 5 * 1024 * 1024) {
            setErrors(prev => ({ ...prev, photo: "File size exceeds 5MB limit" }));
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            // Replace with your real IMGBB API key environmental variable injection
            const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            console.log(data);
            
            if (data.success) {
                setPhotoUrl(data.data.url);
                setErrors(prev => ({ ...prev, photo: null }));
            } else {
                setErrors(prev => ({ ...prev, photo: "Upload failed. Try again." }));
            }
        } catch (err) {
            setErrors(prev => ({ ...prev, photo: "Network error during photo upload" }));
        } finally {
            setIsUploading(false);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setValidationError("");

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());
        const payload = {
            ...user,
            district: selectedDistrictName || user.district,
            upazila: selectedUpazilaName || user.upazila,
        };

        console.log(payload);
        // Validate confirm password
        if (payload.password !== payload.confirmPassword) {
            setValidationError("Passwords do not match");
            return;
        }

        if (!payload.bloodGroup) {
            setValidationError("Please select a blood group");
            return;
        }

        if (!payload.district) {
            setValidationError("Please select a district");
            return;
        }

        if (!payload.upazila) {
            setValidationError("Please select an upazila");
            return;
        }

        setIsLoading(true);

        try {
            const { data, error } = await authClient.signUp.email({
                email: payload.email,
                password: payload.password,
                name: payload.name,
                image: payload.image,
                bloodGroup: payload.bloodGroup,
                district: payload.district,
                upazila: payload.upazila,
                photo: photoUrl, // Include the uploaded photo URL in the user data
            });
            console.log(data, error);

            if (data) {
                router.push("/");
            }

            if (error) {
                setValidationError("Invalid credentials");
            }
        } catch (err) {
            setValidationError(err.message || "An error occurred during registration");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="text-center my-3">
                <h1 className="text-2xl font-bold">Register</h1>
                <p>Become a blood donor today</p>
            </div>
            <Card className="border rounded-none max-w-125 mx-auto">
                {validationError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {validationError}
                    </div>
                )}
                <Form onSubmit={onSubmit} className="flex justify-center flex-col gap-4">
                    <TextField isRequired name="name" type="text">
                        <Label>Name</Label>
                        <Input placeholder="Enter your name" />
                        <FieldError />
                    </TextField>

                    {/* Custom Styled Upload Block matching attachment blueprint exactly */}
                        <div className="flex flex-col gap-1 w-full">
                            <span className="font-medium text-sm">Profile Photo</span>
                            <div className="flex items-center gap-4 mt-1">
                                <label className="w-14 h-14 border border-dashed border-zinc-500 hover:border-zinc-500 bg-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors group relative overflow-hidden">
                                    <input 
                                        type="file" 
                                        accept="image/png, image/jpeg" 
                                        onChange={handlePhotoUpload} 
                                        className="hidden" 
                                    />
                                    {photoUrl ? (
                                        <img src={photoUrl} alt="Photo Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <HiArrowUpTray size={18} className="text-zinc-400 group-hover:text-zinc-200 transition-colors" />
                                    )}
                                </label>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-400">
                                        {isUploading ? 'Uploading file...' : 'Upload image'}
                                    </span>
                                    <span className="text-xs text-zinc-600 mt-0.5">PNG, JPG up to 5MB</span>
                                    {errors.photo && <span className="text-xs text-danger mt-1">{errors.photo}</span>}
                                </div>
                            </div>
                        </div>

                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label>Email</Label>
                        <Input placeholder="john@example.com" />
                        <FieldError />
                    </TextField>

                    <Select
                        isRequired
                        name="bloodGroup"
                        placeholder="Select your blood group"
                        className="w-full"
                    >
                        <Label>Blood Group</Label>
                        <Select.Trigger>
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                            <ListBox>
                                <ListBox.Item id="O+" textValue="O+">
                                    O+
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="O-" textValue="O-">
                                    O-
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="A+" textValue="A+">
                                    A+
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="A-" textValue="A-">
                                    A-
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="B+" textValue="B+">
                                    B+
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="B-" textValue="B-">
                                    B-
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="AB+" textValue="AB+">
                                    AB+
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="AB-" textValue="AB-">
                                    AB-
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                            </ListBox>
                        </Select.Popover>
                        <Description>Select your blood group</Description>
                    </Select>

                    <Select
                        isRequired
                        name="district"
                        placeholder="Select your district"
                        className="w-full"
                        onSelectionChange={(key) => {
                            const selectedValue = key ? String(key) : '';
                            setSelectedDistrict(selectedValue);
                            const district = districts.find((item) => String(item.id) === selectedValue);
                            setSelectedDistrictName(district?.name || '');
                            setSelectedUpazilaName('');
                        }}
                    >
                        <Label>District</Label>
                        <Select.Trigger>
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                            <ListBox>
                                {districts.map((d) => (
                                    <ListBox.Item 
                                        key={d.id} 
                                        id={String(d.id)} 
                                        textValue={d.name}
                                    >
                                        {d.name}
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                        <Description>Select your district</Description>
                    </Select>

                    <Select
                        isRequired
                        name="upazila"
                        placeholder="Select your upazila"
                        className="w-full"
                        isDisabled={!selectedDistrict}
                        onSelectionChange={(key) => {
                            const selectedValue = key ? String(key) : '';
                            setSelectedUpazilaName(selectedValue);
                        }}
                    >
                        <Label>Upazila</Label>
                        <Select.Trigger>
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                            <ListBox>
                                {upazilas.length > 0 ? (
                                    upazilas.map((u) => (
                                        <ListBox.Item 
                                            key={u.id} 
                                            id={u.name} 
                                            textValue={u.name}
                                        >
                                            {u.name}
                                            <ListBox.ItemIndicator />
                                        </ListBox.Item>
                                    ))
                                ) : (
                                    <ListBox.Item 
                                        key="empty" 
                                        id="empty" 
                                        textValue="Select a district first"
                                        isDisabled
                                    >
                                        Select a district first
                                    </ListBox.Item>
                                )}
                            </ListBox>
                        </Select.Popover>
                        <Description>Select your upazila</Description>
                    </Select>

                    <TextField
                        isRequired
                        minLength={6}
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 6) {
                                return "Password must be at least 6 characters";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }
                            if (!/[a-z]/.test(value)) {
                                return "Password must contain at least one lowercase letter";
                            }
                            if (!/[0-9]/.test(value)) {
                                return "Password must contain at least one number";
                            }
                            return null;
                        }}
                        onChange={(value) => setPassword(value)}
                    >
                        <Label>Password</Label>
                        <Input placeholder="Enter your password" />
                        <Description>
                            Must be at least 6 characters with 1 uppercase, 1 lowercase, and 1 number
                        </Description>
                        <FieldError />
                    </TextField>

                    <TextField
                        isRequired
                        name="confirmPassword"
                        type="password"
                        validate={(value) => {
                            if (value !== password) {
                                return "Passwords do not match";
                            }
                            return null;
                        }}
                        onChange={(value) => setConfirmPassword(value)}
                    >
                        <Label>Confirm Password</Label>
                        <Input placeholder="Re-enter your password" />
                        <FieldError />
                    </TextField>
                    <div className="flex justify-center gap-2">
                        <Button
                            className={"rounded-none w-full bg-[#c1121f] hover:bg-[#780000] font-semibold"}
                            type="submit"
                            isLoading={isLoading}
                            disabled={isLoading}
                        >
                            {isLoading ? "Registering..." : "Register"}
                        </Button>
                    </div>
                </Form>

                <div className="flex justify-end items-center gap-3">
                    <p>Already have an account? <Link href="/login" className="text-[#c1121f] hover:underline">Login</Link></p>
                </div>
            </Card>
        </div>
    );
};

export default SignUpPage;