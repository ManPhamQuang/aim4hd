//* Components import
import React from "react";
import PropTypes from "prop-types";

//*Styling import
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { List } from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: "20px",
		marginLeft: "2%",
		marginRight: "2%",
		borderRadius: "0px 0px 8px 8px",
		display: "flex",
		flexWrap: "wrap",
		// overflow: "hidden",
		paddingBottom: "20px",
	},
	title: {
		color: "white",
		fontWeight: "500",
	},
	titleBar: {
		background:
			"linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
	},
	icon: {
		color: "rgba(255, 255, 255, 0.54)",
	},
	root2: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",
		overflow: "hidden",
		backgroundColor: theme.palette.background.paper,
	},
	titleBar: {
		background:
			"linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
	},
	modal: {
		position: "absolute",
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	modal2: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
}));

export default function RightProfile({ history }) {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);
	const [open, setOpen] = React.useState(false);
	const [imgPath, setimgPath] = React.useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const handleOpen = (e) => {
		setimgPath(e.target.src);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const BigImage = (
		<div className={classes.modal}>
			<img
				src={imgPath}
				onClick={handleOpen}
				border="1"
				style={{
					height: "50vh",
					width: "30vw",
				}}
			/>
		</div>
	);

	return (
		<Paper className={classes.root} variant="outlined">
			<AppBar
				position="static"
				style={{
					backgroundColor: "white",
					color: "black",
					boxShadow: "none",
				}}
			>
				<Tabs
					variant="fullWidth"
					value={value}
					onChange={handleChange}
					aria-label="simple tabs example"
				>
					<Tab label="My achievement" />
				</Tabs>
			</AppBar>
			<div className={classes.root2}>
				<GridList cellHeight={180} spacing={7}>
					{history.images.map((image) => (
						<GridListTile key={image.title}>
							<img
								src={image.link}
								alt={image.title}
								onClick={handleOpen}
								border="1"
								style={{
									height: "15rem",
									width: "15rem",
									marginTop: "2rem",
								}}
							/>
							<GridListTileBar
								title={image.title}
								classes={{
									root: classes.titleBar,
								}}
							/>
						</GridListTile>
					))}
				</GridList>
				<React.Fragment>
					<Modal
						open={open}
						onClose={handleClose}
						aria-labelledby="simple-modal-title"
						aria-describedby="simple-modal-description"
						className={classes.modal2}
						closeAfterTransition
						BackdropComponent={Backdrop}
						BackdropProps={{
							timeout: 500,
						}}
					>
						<Fade in={open}>{BigImage}</Fade>
					</Modal>
				</React.Fragment>
			</div>
		</Paper>
	);
}
