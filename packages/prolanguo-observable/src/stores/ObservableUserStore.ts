import { ObservableStore } from "./ObservableStore";
import { ObservableUser } from "../observables/user/ObservableUser";
import { observable, computed, action } from "mobx";
import { assertExists } from "@prolanguo/prolanguo-common/assert"

// based on an existing ObservableUser, this is a deeply nested object
export class ObservableUserStore extends ObservableStore{

    @observable
    public currentUser: null | ObservableUser;
    
    public constructor(currentUser: null | ObservableUser){
        super();
        this.currentUser = currentUser
    }

    @computed
    public get existingCurrentUser(): ObservableUser{
        return assertExists(
            this.currentUser,
            "current user should not be null or undefined"
        )
    }

    @action
    public reset(newUserStore: ObservableUserStore): void {
        this.currentUser = newUserStore.currentUser
    }
};