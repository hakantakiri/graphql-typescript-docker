export const typeDefs = `#graphql

    type Player {
        id: ID
        name: String
        position: String
        dateOfBirth: String
        nationality: String
        teamId: String
        team: Team
    }

    type Coach {
        id: ID
        name: String
        dateOfBirth: String
        nationality: String
        teamId: String
        team: Team
    }

    type Team {
        id: ID
        name: String
        shortName: String
        tla: String
        crest: String
        adress: String
        website: String
        founded: Int
        clubColors: String
        venue: String
        players: [Player]
        coach: Coach
        competitions: [Competition]

    }

    type Competition {
        id: ID
        name: String
        code: String
        type: String
        emblem: String
    }

    type Query {
        players (leagueCode: String!, filters: PlayersFilters): [Player],
        coaches (leagueCode: String!): [Coach]
        team (teamName: String! ): Team
    }

    input PlayersFilters {
        teamName: String
    }

    type Mutation {
        importLeague (leagueCode: String!): Competition
    }
`
