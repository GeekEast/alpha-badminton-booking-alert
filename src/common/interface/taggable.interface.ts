export interface ITag {
  name: string
  value: string
}

export interface ITaggable {
  tags?: ITag[]
}
