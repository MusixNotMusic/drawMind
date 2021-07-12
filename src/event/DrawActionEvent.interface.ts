export default interface DrawActionEvent {
    startHandler (e: any): void,
    moveHandler(e: any): void,
    endHandler(e: any): void
}