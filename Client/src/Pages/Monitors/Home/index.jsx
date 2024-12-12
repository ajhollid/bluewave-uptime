import "./index.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUptimeMonitorsByTeamId } from "../../../Features/UptimeMonitors/uptimeMonitorsSlice";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { Box, Button, Stack } from "@mui/material";
import PropTypes from "prop-types";
import SkeletonLayout from "./skeleton";
import Fallback from "./fallback";
import StatusBox from "./StatusBox";
import Breadcrumbs from "../../../Components/Breadcrumbs";
import Greeting from "../../../Utils/greeting";
import { CurrentMonitoring } from "./CurrentMonitoring";
import { useIsAdmin } from "../../../Hooks/useIsAdmin";

const Monitors = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const isAdmin = useIsAdmin();
	const monitorState = useSelector((state) => state.uptimeMonitors);
	const authState = useSelector((state) => state.auth);
	const dispatch = useDispatch({});
	const [monitorUpdateTrigger, setMonitorUpdateTrigger] = useState(false);

	const handlePause = () => {
		setMonitorUpdateTrigger((prev) => !prev);
	};

	useEffect(() => {
		dispatch(getUptimeMonitorsByTeamId(authState.authToken));
	}, [authState.authToken, dispatch, monitorUpdateTrigger]);

	//TODO bring fetching to this component, like on pageSpeed

	const loading = monitorState?.isLoading;

	const totalMonitors = monitorState?.monitorsSummary?.monitorCounts?.total;

	const hasMonitors = totalMonitors > 0;
	const noMonitors = !hasMonitors;
	const canAddMonitor = isAdmin && hasMonitors;

	return (
		<Stack
			className="monitors"
			gap={theme.spacing(8)}
		>
			<Box>
				<Breadcrumbs list={[{ name: `monitors`, path: "/monitors" }]} />
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					mt={theme.spacing(5)}
					gap={theme.spacing(6)}
				>
					<Greeting type="uptime" />
					{canAddMonitor && (
						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								navigate("/monitors/create");
							}}
							sx={{ fontWeight: 500, whiteSpace: "nowrap" }}
						>
							Create monitor
						</Button>
					)}
				</Stack>
			</Box>
			{noMonitors && <Fallback isAdmin={isAdmin} />}
			{loading ? (
				<SkeletonLayout />
			) : (
				<>
					{hasMonitors && (
						<>
							<Stack
								gap={theme.spacing(8)}
								direction="row"
								justifyContent="space-between"
							>
								<StatusBox
									title="up"
									value={monitorState?.monitorsSummary?.monitorCounts?.up ?? 0}
								/>
								<StatusBox
									title="down"
									value={monitorState?.monitorsSummary?.monitorCounts?.down ?? 0}
								/>
								<StatusBox
									title="paused"
									value={monitorState?.monitorsSummary?.monitorCounts?.paused ?? 0}
								/>
							</Stack>
							<CurrentMonitoring
								isAdmin={isAdmin}
								monitors={monitorState.monitorsSummary.monitors}
								totalMonitors={totalMonitors}
								handlePause={handlePause}
							/>
						</>
					)}
				</>
			)}
		</Stack>
	);
};

Monitors.propTypes = {
	isAdmin: PropTypes.bool,
};
export default Monitors;
