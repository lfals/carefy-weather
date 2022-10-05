export type ICitySearch = CitySearch[]

export interface CitySearch {
    Version: number
    Key: string
    Type: string
    Rank: number
    LocalizedName: string
    Country: Country
    AdministrativeArea: AdministrativeArea
}

export interface Country {
    ID: string
    LocalizedName: string
}

export interface AdministrativeArea {
    ID: string
    LocalizedName: string,
    CountryID: string
}
