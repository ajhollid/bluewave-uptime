import { useState, useRef, useContext } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import TabPanel from "@mui/lab/TabPanel";
import ImageIcon from "@mui/icons-material/Image";

import ConfigBox from "../../../Components/ConfigBox";
import TextInput from "../../Inputs/TextInput";
import ImageField from "../../Inputs/Image";
import timezones from "../../../Utils/timezones.json";
import Select from "../../Inputs/Select";
import { logoImageValidation } from "../../../Validation/validation";
import { formatBytes } from "../../../Utils/fileUtils";
import ProgressUpload from "../../ProgressBars";
import { StatusFormContext } from "../../../Pages/StatusPage/CreateStatusContext";
import ColorPicker from "../../Inputs/ColorPicker";
import Checkbox from "../../Inputs/Checkbox";

/**
 * General settings panel is ued to compose part of the public static page
 * for general informations like company name, subdomain url, logo and color etc
 */
const GeneralSettingsPanel = () => {
	const theme = useTheme();
	const {
		form,
		setForm,
		errors,
		setErrors,
		handleBlur,
		handleChange,
		handelCheckboxChange,
	} = useContext(StatusFormContext);
	const [logo, setLogo] = useState(form.logo);

	const [progress, setProgress] = useState({ value: 0, isLoading: false });
	const intervalRef = useRef(null);
	const STATUS_PAGE = import.meta.env.VITE_STATU_PAGE_URL ?? "status-page";

	// Clears specific error from errors state
	const clearError = (err) => {
		setErrors((prev) => {
			const updatedErrors = { ...prev };
			if (updatedErrors[err]) delete updatedErrors[err];
			return updatedErrors;
		});
	};
	const removeLogo = () => {
		errors["logo"] && clearError("logo");
		setLogo({});
		setForm((prev) => ({
			...prev,
			logo: logo?.src,
		}));
		// interrupt interval if image upload is canceled prior to completing the process
		clearInterval(intervalRef.current);
		setProgress({ value: 0, isLoading: false });
	};

	const handleColorChange = (newValue) => {
		setForm((prev) => ({
			...prev,
			color: newValue,
		}));
	};

	const validateField = (toValidate, schema, name = "logo") => {
		const { error } = schema.validate(toValidate, { abortEarly: false });
		setErrors((prev) => {
			let prevErrors = { ...prev };
			if (error) prevErrors[name] = error?.details[0].message;
			else delete prevErrors[name];
			return prevErrors;
		});
		if (error) return true;
	};

	const handleLogo = (event) => {
		const pic = event.target?.files?.[0];
		let error = validateField({ type: pic?.type, size: pic?.size }, logoImageValidation);
		if (error) return;

		const newLogo = {
			src: URL.createObjectURL(pic),
			name: pic.name,
			type: pic.type,
			size: pic.size,
		};
		setProgress((prev) => ({ ...prev, isLoading: true }));
		setLogo(newLogo);
		setForm({ ...form, logo: newLogo });
		intervalRef.current = setInterval(() => {
			const buffer = 12;
			setProgress((prev) => {
				if (prev.value + buffer >= 100) {
					clearInterval(intervalRef.current);
					return { value: 100, isLoading: false };
				}
				return { ...prev, value: prev.value + buffer };
			});
		}, 120);
	};

	return (
		<TabPanel value="General settings">
			<Stack
				component="form"
				className="status-general-settings-form"
				noValidate
				spellCheck="false"
				gap={theme.spacing(12)}
				mt={theme.spacing(6)}
			>
				<ConfigBox>
					<Box>
						<Stack gap={theme.spacing(6)}>
							<Typography component="h2">Access</Typography>
							<Typography component="p">
								If your status page is ready, you can mark it as published.
							</Typography>
						</Stack>
					</Box>
					<Stack gap={theme.spacing(6)}>
						<Checkbox
							id="publish"
							label={`Published and visible to the public`}
							isChecked={form.publish}
							value={form.publish}
							onChange={handelCheckboxChange}
							onBlur={handleBlur}
						/>
					</Stack>
				</ConfigBox>

				<ConfigBox>
					<Box>
						<Stack gap={theme.spacing(6)}>
							<Typography component="h2">Basic Information</Typography>
							<Typography component="p">
								Define company name and the subdomain that your status page points to.
							</Typography>
						</Stack>
					</Box>
					<Stack gap={theme.spacing(18)}>
						<TextInput
							id="companyName"
							type="text"
							label="Company name"
							value={form.companyName}
							onChange={handleChange}
							onBlur={handleBlur}
							helperText={errors["companyName"]}
							error={errors["companyName"] ? true : false}
						/>
						<TextInput
							id="url"
							type="url"
							label="Your status page address"
							disabled
							value={form.url ?? "/" + STATUS_PAGE}
							onChange={handleChange}
							onBlur={handleBlur}
							helperText={errors["url"]}
							error={errors["url"] ? true : false}
						/>
					</Stack>
				</ConfigBox>
				<ConfigBox>
					<Box>
						<Stack gap={theme.spacing(6)}>
							<Typography component="h2">Appearance</Typography>
							<Typography component="p">
								Define the default look and feel of your public status page.
							</Typography>
						</Stack>
					</Box>
					<Stack gap={theme.spacing(6)}>
						<Select
							id="timezone"
							name="timezone"
							label="Display timezone"
							value={form.timezone}
							onChange={handleChange}
							onBlur={handleBlur}
							items={timezones}
							error={errors["display-timezone"]}
						/>
						<Stack direction={"column"}>
							<Typography
								component="h3"
								color={theme.palette.text.secondary}
								fontWeight={500}
								fontSize={13}
								sx={{ mb: theme.spacing(2) }}
							>
								Logo
							</Typography>
							<ImageField
								id="logo"
								src={form.logo?.src ?? logo?.src}
								loading={progress.isLoading && progress.value !== 100}
								onChange={handleLogo}
								isRound={false}
							/>
							{progress.isLoading || progress.value !== 0 || errors["logo"] ? (
								<ProgressUpload
									icon={<ImageIcon />}
									label={logo?.name}
									size={formatBytes(logo?.size)}
									progress={progress.value}
									onClick={removeLogo}
									error={errors["logo"]}
								/>
							) : logo && logo.type ? (
								<Button
									variant="contained"
									color="secondary"
									onClick={removeLogo}
									sx={{
										width: "100%",
										maxWidth: "200px",
										alignSelf: "center",
										mt: theme.spacing(4),
									}}
								>
									Remove Logo
								</Button>
							) : (
								""
							)}
						</Stack>
						<Stack direction={"column"}>
							<Typography
								component="h3"
								color={theme.palette.text.secondary}
								fontWeight={500}
								fontSize={13}
							>
								Color
							</Typography>

							<ColorPicker
								id="color"
								value={form.color}
								error={errors["color"]}
								onChange={handleColorChange}
								onBlur={handleBlur}
							></ColorPicker>
						</Stack>
					</Stack>
				</ConfigBox>
			</Stack>
		</TabPanel>
	);
};

export default GeneralSettingsPanel;
