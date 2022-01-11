import {
    AddUsers, SetCurrentPage, SetTotalUsers,
    getUsers, followThunk, unfollowThunk
} from "../../state/users-reducer";
import Users from "./users";
import {connect} from "react-redux";
import React from "react";
import Preloader from "../../components/preloader";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.usersOnPage);
    }

    onPageChanged = (pageNum) => {
        this.props.getUsers(pageNum, this.props.usersOnPage);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                users={this.props.users}
                totalUsers={this.props.totalUsers}
                usersOnPage={this.props.usersOnPage}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                followThunk={this.props.followThunk}
                unfollowThunk={this.props.unfollowThunk}
                followingProgress={this.props.followingProgress}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        totalUsers: state.usersPage.totalUsers,
        usersOnPage: state.usersPage.usersOnPage,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingProgress: state.usersPage.followingProgress
    }
}
export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {AddUsers, SetTotalUsers, SetCurrentPage, getUsers, followThunk, unfollowThunk})
    )(UsersContainer);