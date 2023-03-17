export interface gatos {
    id?: String,
    title?: String,
    subtitle?: String,
    image: String,
    autor?:autor,    
}

export interface autor{
    nombre: String,
    año:Number
}
