export const sqlOptions = {
    client: "mysql",
    connection: {
        host: '127.0.0.1',
        user: "lopezmariano",
        password: 'password',
        database: 'db-coder-desafio',
        port: 3307,
    }
};

export const sqlite3Options = {
    client: "sqlite3",
    connection: {
        filename: './db//sqlite3DB.sqlite'
    },
    useNullAsDefault: true
};
