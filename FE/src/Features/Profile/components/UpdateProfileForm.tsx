/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { Box, Button, Image, Input } from "@chakra-ui/react";
import { useUpdateProfile } from "../Hooks/useUpdateProfile";
import FormRow from "./FormRow";
import { RootState } from "@/store/type/RootState";
import { useSelector } from "react-redux";
import { FcEditImage } from "react-icons/fc";

export default function UpdateProfileForm() {
	const user = useSelector((state: RootState) => state?.auth);
	const { register, handleSubmit, formState, reset } = useForm();
	const { errors } = formState;

	const {
		form,
		setForm,
		updateUser,
		isUpdating,
		fileInputRef,
		setImage,
		handleButtonClick,
		// handleChange,
	} = useUpdateProfile();

	function onSubmit({ fullname, username, bio }: any) {
		setForm({ ...form, fullname, username, bio });
		updateUser();
	}
	// const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
	// 	setValue(e.target.name, e.target.files ? e.target.files : e.target.value);
	// };

	return (
		<Box
			w="400px"
			display={"flex"}
			flexDirection="column"
			bgColor="gray.700"
			rounded="xl"
			px="5"
			py="9">
			<Box display="flex" justifyContent="center">
				<Image
					h="140px"
					w="auto"
					objectFit="cover"
					rounded="full"
					src={user.profile_picture}
					border="4px"
					borderColor="green.400"
				/>
				<FcEditImage size={20} onClick={handleButtonClick} />
				<Input
					type="value"
					id="profile_picture"
					defaultValue={user.profile_picture}
					onChange={(e) => {
						if (e.target?.files) {
							setImage(e.target?.files[0]);
						} else {
							setImage(null);
						}
					}}
					style={{ display: "none" }}
					ref={fileInputRef}
				/>
			</Box>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormRow
					label="Fullname"
					error={errors?.full_name?.message?.toString()}>
					<Input
						defaultValue={user.fullname}
						type="text"
						isDisabled={isUpdating}
						id="fullname"
						{...register("fullname", {
							required: "This field is required",
						})}
					/>
				</FormRow>
				<FormRow label="Username" error={errors?.username?.message?.toString()}>
					<Input
						defaultValue={user.username}
						type="text"
						id="username"
						isDisabled={isUpdating}
						{...register("username", {
							required: "This field is required",
						})}
					/>
				</FormRow>
				<FormRow
					label="Profile description"
					error={errors?.profile_description?.message?.toString()}>
					<Input
						defaultValue={user.bio}
						type="text"
						id="bio"
						isDisabled={isUpdating}
						{...register("bio", {
							required: "This field is required",
						})}
					/>
				</FormRow>
				<Box
					mt="20px"
					display="flex"
					justifyContent="space-between"
					maxW="11rem">
					<Button onClick={reset} type="reset">
						Cancel
					</Button>
					<Button type="submit" isLoading={isUpdating} colorScheme="green">
						Submit
					</Button>
				</Box>
			</form>
		</Box>
	);
}
