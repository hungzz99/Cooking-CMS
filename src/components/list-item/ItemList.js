import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CardImg, Button, Modal, ModalBody } from "shards-react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from 'firebase';


class ItemPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            openModal: false,
            contentModal: "",
        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleCloseCancel = this.handleCloseCancel.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleCloseAgree = this.handleCloseAgree.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            openModal: !this.state.openModal,
        }, () => {
            if (this.state.openModal === false) {
                window.location.reload();
            }
        });
        setTimeout(() => {
            window.location.reload();
        },2000);
        
    }

    onToggleChange(contentModal) {
        console.log(contentModal);
        this.setState({
            contentModal: contentModal,
        }, () => { this.toggle() })
    }

    onClick() {
        this.handleClickOpen();
    }

    handleClickOpen() {
        this.setState({ openDialog: true })
    }

    handleCloseCancel() {
        this.setState({ openDialog: false })
    }

    handleCloseAgree() {
        this.deletePost();
        this.setState({ openDialog: false })
    }

    deletePost() {
        const db = firebase.database().ref(`/posts/${this.props.post.postId}`)
        db.remove().then(() => {
            this.onToggleChange("Delete successfuly!")
        }).catch((error) => {
            this.onToggleChange(`Fail to delete post! Error: ${error}`)
        })
    }

    render() {
        return (
            <>
                <tr>
                    <td>{this.props.post.postId}</td>
                    <td>{this.props.post.title}</td>
                    <td>{this.props.post.type}</td>
                    <td><CardImg src={this.props.post.photoUrl} width="60" height="60" /></td>
                    <td>{this.props.post.time} minutes</td>
                    <td>
                        <Link to={`/details/${this.props.post.postId}`}>
                            <button className="button-icon">
                                <img class="icon" height="24px" width="24px" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDE4LjQ1MyAxOC40NTMiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGc+CgkJPHJlY3QgeD0iMi43MTEiIHk9IjQuMDU4IiBzdHlsZT0iIiB3aWR0aD0iOC4yMyIgaGVpZ2h0PSIxLjMzNCIgZmlsbD0iI2Y3NDE0MSIgZGF0YS1vcmlnaW5hbD0iIzAzMDEwNCIgY2xhc3M9IiI+PC9yZWN0PgoJCTxwYXRoIHN0eWxlPSIiIGQ9Ik0xNC45NzIsMTQuMDg4YzAuNjM4LTEuMTI3LDAuNDUzLTIuNTYzLTAuNDc1LTMuNDljLTAuNTQ5LTAuNTQ5LTEuMjc5LTAuODUyLTIuMDU4LTAuODUyICAgIGMtMC43NzksMC0xLjUxLDAuMzAzLTIuMDU5LDAuODUycy0wLjg1MiwxLjI3OS0wLjg1MiwyLjA1OWMwLDAuNzc3LDAuMzAzLDEuNTA4LDAuODUyLDIuMDU5YzAuNTQ5LDAuNTQ3LDEuMjc5LDAuODUsMi4wNTcsMC44NSAgICBjMC41MDcsMCwwLjk5OC0wLjEyOSwxLjQzNC0wLjM3NWwzLjI2MiwzLjI2MmwxLjEwMS0xLjEwMkwxNC45NzIsMTQuMDg4eiBNMTMuNjY0LDEzLjg4MWMtMC42NTIsMC42NTItMS43OTYsMC42NTItMi40NDgsMCAgICBjLTAuNjc1LTAuNjc2LTAuNjc1LTEuNzczLDAtMi40NDljMC4zMjYtMC4zMjYsMC43NjItMC41MDYsMS4yMjUtMC41MDZzMC44OTcsMC4xOCwxLjIyNCwwLjUwNnMwLjUwNywwLjc2MiwwLjUwNywxLjIyNSAgICBTMTMuOTkxLDEzLjU1NCwxMy42NjQsMTMuODgxeiIgZmlsbD0iI2Y3NDE0MSIgZGF0YS1vcmlnaW5hbD0iIzAzMDEwNCIgY2xhc3M9IiI+PC9wYXRoPgoJCTxwYXRoIHN0eWxlPSIiIGQ9Ik0xMy4zMzIsMTYuM0gxLjg1N2MtMC4xODIsMC0wLjMyOS0wLjE0OC0wLjMyOS0wLjMyOFYxLjYzOGMwLTAuMTgyLDAuMTQ3LTAuMzI5LDAuMzI5LTAuMzI5ICAgIGgxMS40NzVjMC4xODIsMCwwLjMyOCwwLjE0NywwLjMyOCwwLjMyOVY4Ljk1YzAuNDc1LDAuMTA0LDAuOTE4LDAuMzA3LDEuMzEsMC41OTdWMS42MzhDMTQuOTcsMC43MzUsMTQuMjM2LDAsMTMuMzMyLDBIMS44NTcgICAgQzAuOTU0LDAsMC4yMTksMC43MzUsMC4yMTksMS42Mzh2MTQuMzM0YzAsMC45MDIsMC43MzUsMS42MzcsMS42MzgsMS42MzdoMTEuNDc1YzAuNjg1LDAsMS4wMDktMC4xNjIsMS4yNTMtMC43NmwtMC41OTQtMC41OTQgICAgQzEzLjc3MiwxNi4zNDcsMTMuNDI2LDE2LjMsMTMuMzMyLDE2LjN6IiBmaWxsPSIjZjc0MTQxIiBkYXRhLW9yaWdpbmFsPSIjMDMwMTA0IiBjbGFzcz0iIj48L3BhdGg+CgkJPHJlY3QgeD0iMi43MTEiIHk9IjcuODE4IiBzdHlsZT0iIiB3aWR0aD0iOC4yMyIgaGVpZ2h0PSIxLjMzNCIgZmlsbD0iI2Y3NDE0MSIgZGF0YS1vcmlnaW5hbD0iIzAzMDEwNCIgY2xhc3M9IiI+PC9yZWN0PgoJPC9nPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjwvZz48L3N2Zz4=" />
                            </button>
                        </Link>
                        <Link to={`/update/${this.props.post.postId}`}>
                            <button className="button-icon">
                                <img class="icon" height="24px" width="24px" src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxM3B0IiB2aWV3Qm94PSIwIC0xIDUxMy4yMiA1MTMiIHdpZHRoPSI1MTNwdCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMjQwLjAxNTYyNSA0OTUuNDY4NzVjLS4wMTU2MjUtOC4yMDcwMzEgNi4xNzU3ODEtMTUuMjc3MzQ0IDE0LjM2NzE4Ny0xNS44ODY3MTkgMTAwLjg4MjgxMy03LjQ3MjY1NiAxODAuNjg3NS05MiAxODAuNjg3NS0xOTQuNzM0Mzc1bDMyLS44ODI4MTJ2Ljg4MjgxMmMwIDExOS4yNjE3MTktOTIuNDI5Njg3IDIxNy40MjE4NzUtMjA5LjQwNjI1IDIyNi41NzQyMTktOS40NTcwMzEuNzM0Mzc1LTE3LjYzMjgxMi02LjQ4MDQ2OS0xNy42NDg0MzctMTUuOTUzMTI1em0wIDAiIGZpbGw9IiNmYmMwMmQiLz48cGF0aCBkPSJtMTEzLjg3MTA5NCA0NTYuODc4OTA2Yy03MC4yMjI2NTYtNDAuNTExNzE4LTExMy44NzEwOTQtMTE2LTExMy44NzEwOTQtMTk2Ljk5MjE4NyAwLTM0LjIwNzAzMSA3LjcxMDkzOC02Ny45NTMxMjUgMjIuNDE0MDYyLTk4LjUyNzM0NCAzLjg3NS04LjA1MDc4MSAxMy42MDE1NjMtMTEuMzEyNSAyMS4zNDc2NTctNi44NjcxODdsMS41MzUxNTYuODgyODEyYzcuMDM5MDYzIDQuMDQ2ODc1IDkuMzI4MTI1IDEyLjgwMDc4MSA1LjgyNDIxOSAyMC4xMDkzNzUtMTIuNTQ2ODc1IDI2LjIxMDkzNy0xOS4xMjEwOTQgNTUuMTA1NDY5LTE5LjEyMTA5NCA4NC40MDIzNDQgMCA2OS41OTc2NTYgMzcuNTAzOTA2IDEzNC40NDkyMTkgOTcuODU1NDY5IDE2OS4yNjE3MTl6bTAgMCIgZmlsbD0iIzRkZDBlMSIvPjxwYXRoIGQ9Im00MzcuNDQxNDA2IDEzNy44ODY3MTljLTcuMDg5ODQ0IDQuMTQ0NTMxLTE2LjMwNDY4NyAyLjMyMDMxMi0yMC45NjA5MzctNC40NDkyMTktMzYuMjQyMTg4LTUyLjY1NjI1LTk2LjcwMzEyNS04NC44MzIwMzEtMTYxLjA1NDY4OC04NC44MzIwMzEtMzQuNTE1NjI1IDAtNjguNDMzNTkzIDkuMTIxMDkzLTk4LjA5NzY1NiAyNi4zODI4MTJsLTE2LjA5NzY1Ni0yNy42NDQ1MzFjMzQuNTQ2ODc1LTIwLjExMzI4MSA3NC4wMTU2MjUtMzAuNzM4MjgxIDExNC4xOTUzMTItMzAuNzM4MjgxIDc0LjYyMTA5NCAwIDE0NC43MzQzNzUgMzcuMTUyMzQzIDE4Ni45NTcwMzEgOTguMDE1NjI1IDUuMzk0NTMyIDcuNzkyOTY4IDMuMjM0Mzc2IDE4LjQ5NjA5NC00Ljk0MTQwNiAyMy4yNjU2MjV6bTAgMCIgZmlsbD0iI2U2NGExOSIvPjxwYXRoIGQ9Im0yMDQuMTYwMTU2IDk2LjEwOTM3NWgtODB2LTgwYzAtOC44MzIwMzEgNy4xNjc5NjktMTYgMTYtMTYgOC44MzIwMzIgMCAxNiA3LjE2Nzk2OSAxNiAxNnY0OGg0OGM4LjgzMjAzMiAwIDE2IDcuMTY3OTY5IDE2IDE2cy03LjE2Nzk2OCAxNi0xNiAxNnptMCAwIiBmaWxsPSIjZmY3MDQzIi8+PHBhdGggZD0ibTEzNiA0NjQuMTA5Mzc1aC04MGMtOC44MzIwMzEgMC0xNi03LjE2Nzk2OS0xNi0xNnM3LjE2Nzk2OS0xNiAxNi0xNmg0OHYtNDhjMC04LjgzMjAzMSA3LjE2Nzk2OS0xNiAxNi0xNnMxNiA3LjE2Nzk2OSAxNiAxNnptMCAwIiBmaWxsPSIjODBkZWVhIi8+PHBhdGggZD0ibTQ4NS45MDIzNDQgMzIxLjM0Mzc1LTMzLjk0OTIxOS0zMy45Mzc1LTMzLjk1MzEyNSAzMy45Mzc1Yy02LjIzODI4MSA2LjIzODI4MS0xNi4zODI4MTIgNi4yMzgyODEtMjIuNjI1IDAtNi4yNTM5MDYtNi4yNTc4MTItNi4yMzgyODEtMTYuMzg2NzE5IDAtMjIuNjI1bDU2LjU3ODEyNS01Ni41NjI1IDU2LjU3NDIxOSA1Ni41NjI1YzYuMjU3ODEyIDYuMjM4MjgxIDYuMjU3ODEyIDE2LjM4MjgxMiAwIDIyLjYyNS02LjIzODI4MiA2LjI1MzkwNi0xNi4zNjcxODggNi4yNTM5MDYtMjIuNjI1IDB6bTAgMCIgZmlsbD0iI2ZkZDgzNSIvPjwvc3ZnPg==" />
                            </button>
                        </Link>
                        <button className="button-icon" onClick={this.onClick}>
                            <img class="icon" height="24px" width="24px" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggc3R5bGU9ImZpbGw6I0ZGNDg1QTsiIGQ9Ik00NTIuOTIzLDk4LjQ2MmgtOTguNDYyQzM1NC40NjIsNDQuMDgxLDMxMC4zOCwwLDI1Niwwcy05OC40NjIsNDQuMDgxLTk4LjQ2Miw5OC40NjJINTkuMDc3DQoJYy0xMy41OTgsMC0yNC42MTUsMTEuMDE4LTI0LjYxNSwyNC42MTVzMTEuMDE4LDI0LjYxNSwyNC42MTUsMjQuNjE1aDkuODQ2VjQ0OGMwLjA1OSwzNS4zMjgsMjguNjcyLDYzLjk0MSw2NCw2NGgyNDYuMTU0DQoJYzM1LjMyOC0wLjA1OSw2My45NDEtMjguNjcyLDY0LTY0VjE0Ny42OTJoOS44NDZjMTMuNTk4LDAsMjQuNjE1LTExLjAxOCwyNC42MTUtMjQuNjE1UzQ2Ni41MjEsOTguNDYyLDQ1Mi45MjMsOTguNDYyeiBNMjU2LDQ5LjIzMQ0KCWMyNy4xODUsMCw0OS4yMzEsMjIuMDQ2LDQ5LjIzMSw0OS4yMzFoLTk4LjQ2MkMyMDYuNzY5LDcxLjI3NiwyMjguODE1LDQ5LjIzMSwyNTYsNDkuMjMxeiBNMzkzLjg0Niw0NDgNCgljMCw4LjE1My02LjYxNywxNC43NjktMTQuNzY5LDE0Ljc2OUgxMzIuOTIzYy04LjE1MywwLTE0Ljc2OS02LjYxNy0xNC43NjktMTQuNzY5VjE0Ny42OTJoMjc1LjY5MlY0NDh6Ii8+DQo8Zz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkZCQkMwOyIgZD0iTTIwMS44NDYsMzc5LjA3N2MtMTMuNTk4LDAtMjQuNjE1LTExLjAxOC0yNC42MTUtMjQuNjE1VjI1NmMwLTEzLjU5OCwxMS4wMTgtMjQuNjE1LDI0LjYxNS0yNC42MTUNCgkJczI0LjYxNSwxMS4wMTgsMjQuNjE1LDI0LjYxNXY5OC40NjJDMjI2LjQ2MiwzNjguMDU5LDIxNS40NDQsMzc5LjA3NywyMDEuODQ2LDM3OS4wNzd6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGQkJDMDsiIGQ9Ik0zMTAuMTU0LDM3OS4wNzdjLTEzLjU5OCwwLTI0LjYxNS0xMS4wMTgtMjQuNjE1LTI0LjYxNVYyNTZjMC0xMy41OTgsMTEuMDE4LTI0LjYxNSwyNC42MTUtMjQuNjE1DQoJCWMxMy41OTgsMCwyNC42MTUsMTEuMDE4LDI0LjYxNSwyNC42MTV2OTguNDYyQzMzNC43NjksMzY4LjA1OSwzMjMuNzUxLDM3OS4wNzcsMzEwLjE1NCwzNzkuMDc3eiIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=" />
                        </button>
                    </td>
                </tr>
                <Modal open={this.state.openModal} toggle={this.toggle}>
                    <ModalBody> {this.state.contentModal} </ModalBody>
                </Modal>
                <Dialog
                    open={this.state.openDialog}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Recipes List Notification"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you want to delete this recipes?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseCancel} color="success">
                            Cancel
                        </Button>
                        <Button onClick={this.handleCloseAgree} color="primary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
}

export default ItemPost