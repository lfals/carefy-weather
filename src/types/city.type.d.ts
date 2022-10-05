export interface ICity {
    Key: string
    LocalizedName: string
    AdministrativeArea: AdministrativeArea
}

export interface AdministrativeArea {
    ID: string
    LocalizedName: string
    CountryID: string
}
