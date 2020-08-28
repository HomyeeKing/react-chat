export interface MsgType {
	[text: string]: (msg: string) => JSX.Element
	[img: string]: (msg: string) => JSX.Element
	[video: string]: (msg: string) => JSX.Element
	[audio: string]: (msg: string) => JSX.Element
}
