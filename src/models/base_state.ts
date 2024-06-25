
export class BaseState<T>{
    data: T | undefined
    loading: boolean = true
    error: string | undefined
    page: number = 1
    lastPage: number = 1
    totalData: number = 0

    constructor(data: T | undefined, loading: boolean, error: string | undefined, page: number = 1, lastPage: number = 1, totalData: number = 0) {
        this.data = data
        this.loading = loading
        this.error = error
        this.page = page
        this.lastPage = lastPage
        this.totalData = totalData
    }

    static loading<T>(): BaseState<T>{
        return new BaseState<T>(undefined, true, undefined)
    }

    static error<T>(error: string): BaseState<T>{
        return new BaseState<T>(undefined, false, error)
    }

    static success<T>(data: T, page: number = 1, lastPage: number = 1, total:number = 1): BaseState<T>{
        return new BaseState<T>(data, false, undefined, page, lastPage, total)
    }

}