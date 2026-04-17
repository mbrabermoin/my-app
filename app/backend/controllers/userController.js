const pool = require("../config/database");
const {
  sendSuccess,
  sendError,
  sendValidationError,
} = require("../utils/response");

const getTrips = async (req, res) => {
  console.log('[DEBUG] getTrips called');
  try {
    const { page, limit } = req.query;

    let params = [];
    let hasLimit = limit !== undefined;
    let pageNum = 1;
    let limitNum;

    if (hasLimit) {
      pageNum = Number.parseInt(page, 10) || 1;
      limitNum = Number.parseInt(limit, 10);

      if (!Number.isInteger(limitNum) || limitNum <= 0) {
        return sendValidationError(res, ["limit must be a positive integer"]);
      }

      if (!Number.isInteger(pageNum) || pageNum <= 0) {
        return sendValidationError(res, ["page must be a positive integer"]);
      }
    }

    const tableResult = await pool.query(
      `SELECT table_schema
       FROM information_schema.tables
       WHERE table_name = 'trips'
         AND table_schema NOT IN ('pg_catalog', 'information_schema')
       ORDER BY CASE WHEN table_schema = 'public' THEN 0 ELSE 1 END, table_schema
       LIMIT 1`,
    );

    if (tableResult.rows.length === 0) {
      return sendError(res, "Trips table does not exist", 500);
    }

    const tableSchema = tableResult.rows[0].table_schema;

    const columnsResult = await pool.query(
      `SELECT column_name
       FROM information_schema.columns
       WHERE table_schema = $1 AND table_name = 'trips'
       ORDER BY ordinal_position`,
      [tableSchema],
    );

    if (columnsResult.rows.length === 0) {
      return sendError(res, "Trips table has no readable columns", 500);
    }

    const columnsLower = new Map(
      columnsResult.rows.map((row) => [row.column_name.toLowerCase(), row.column_name]),
    );
    const pickColumn = (...candidates) => {
      for (const candidate of candidates) {
        const found = columnsLower.get(String(candidate).toLowerCase());
        if (found) return found;
      }
      return undefined;
    };

    const idColumn = pickColumn("id");
    const destinyColumn = pickColumn("destiny", "destination", "travelDescription", "description");
    const pesosExchangeColumn = pickColumn("dolarPesosExchange");
    const realExchangeColumn = pickColumn("dolarRealExchange");
    const startDateColumn = pickColumn("startDate");
    const endDateColumn = pickColumn("endDate");
    const paidByColumn = pickColumn("paidBy");

    const selectedColumns = [];
    if (idColumn) selectedColumns.push(`${idColumn} AS id`);
    if (destinyColumn) selectedColumns.push(`${destinyColumn} AS destiny`);
    if (pesosExchangeColumn) selectedColumns.push(`${pesosExchangeColumn} AS "dolarPesosExchange"`);
    if (realExchangeColumn) selectedColumns.push(`${realExchangeColumn} AS "dolarRealExchange"`);
    if (startDateColumn) selectedColumns.push(`${startDateColumn} AS "startDate"`);
    if (endDateColumn) selectedColumns.push(`${endDateColumn} AS "endDate"`);
    if (paidByColumn) selectedColumns.push(`${paidByColumn} AS "paidBy"`);

    const quoteIdent = (value) => `"${value.replace(/"/g, '""')}"`;
    const tableRef = `${quoteIdent(tableSchema)}.${quoteIdent("trips")}`;
    const selectClause = selectedColumns.length > 0 ? selectedColumns.join(", ") : "*";
    const orderByColumn = idColumn || columnsResult.rows[0].column_name;

    let query = `SELECT ${selectClause} FROM ${tableRef} ORDER BY ${quoteIdent(orderByColumn)} ASC`;

    if (hasLimit) {
      const offset = (pageNum - 1) * limitNum;
      query += " LIMIT $1 OFFSET $2";
      params = [limitNum, offset];
    }

    const result = await pool.query(query, params);
    const countResult = await pool.query(`SELECT COUNT(*) FROM ${tableRef}`);
    const totalTrips = Number.parseInt(countResult.rows[0].count);

    let responseData = {
      trips: result.rows,
    };
    
    if (hasLimit) {
      const totalPages = Math.ceil(totalTrips / limitNum);
      responseData.pagination = {
        currentPage: pageNum,
        totalPages,
        totalTrips,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
      };
    } else {
      responseData.totalTrips = totalTrips;
    }

    sendSuccess(res, responseData, "Trips retrieved successfully");
  } catch (error) {
    sendError(res, "Error fetching trips", 500, error.message);
  }
};

const getExpenses = async (req, res) => {
  console.log('[DEBUG] getExpenses called');
  try {
    const { page, limit, travelId } = req.query;
    let hasLimit = limit !== undefined;

    let query = "SELECT id, type, amount, responsible, paymentMethod, travelId, travelDescription, exchange, date FROM expenses";
    let countQuery = "SELECT COUNT(*) FROM expenses";
    let params = [];
    let countParams = [];
    let paramIndex = 1;
    const whereClauses = ["LOWER(TRIM(responsible)) IN ('mati', 'juli')"];

    if (travelId) {
      whereClauses.push("travelId = $" + paramIndex);
      params.push(travelId);
      countParams.push(travelId);
      paramIndex++;
    }

    if (whereClauses.length > 0) {
      query += " WHERE " + whereClauses.join(" AND ");
      countQuery += " WHERE " + whereClauses
        .map((clause, index) => (index === 0 ? clause : "travelId = $1"))
        .join(" AND ");
    }

    query += " ORDER BY id ASC";
    
    if (hasLimit) {
      const pageNum = parseInt(page) || 1;
      const limitNum = parseInt(limit);
      const offset = (pageNum - 1) * limitNum;
      query += " LIMIT $" + paramIndex + " OFFSET $" + (paramIndex + 1);
      params.push(limitNum, offset);
    }

    const result = await pool.query(query, params);
    const countResult = await pool.query(countQuery, countParams);
    const totalExpenses = Number.parseInt(countResult.rows[0].count);

    let responseData = {
      expenses: result.rows,
    };
    
    if (hasLimit) {
      const limitNum = parseInt(limit);
      const pageNum = parseInt(page) || 1;
      const totalPages = Math.ceil(totalExpenses / limitNum);
      responseData.pagination = {
        currentPage: pageNum,
        totalPages,
        totalExpenses,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
      };
    } else {
      responseData.totalExpenses = totalExpenses;
    }

    sendSuccess(res, responseData, "Expenses retrieved successfully");
  } catch (error) {
    sendError(res, "Error fetching expenses", 500, error.message);
  }
};

const getUsers = async (req, res) => {
  try {
    const { page, limit } = req.query;
    let hasLimit = limit !== undefined;
    
    let query = "SELECT id, username, email FROM users ORDER BY id ASC";
    let params = [];
    
    if (hasLimit) {
      const pageNum = parseInt(page) || 1;
      const limitNum = parseInt(limit);
      const offset = (pageNum - 1) * limitNum;
      query += " LIMIT $1 OFFSET $2";
      params = [limitNum, offset];
    }

    const result = await pool.query(query, params);
    const countResult = await pool.query("SELECT COUNT(*) FROM users");
    const totalUsers = Number.parseInt(countResult.rows[0].count);

    let responseData = {
      users: result.rows,
    };
    
    if (hasLimit) {
      const limitNum = parseInt(limit);
      const pageNum = parseInt(page) || 1;
      const totalPages = Math.ceil(totalUsers / limitNum);
      responseData.pagination = {
        currentPage: pageNum,
        totalPages,
        totalUsers,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
      };
    } else {
      responseData.totalUsers = totalUsers;
    }

    sendSuccess(res, responseData, "Users retrieved successfully");
  } catch (error) {
    sendError(res, "Error fetching users", 500, error.message);
  }
};

const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;

    const errors = [];
    if (!username || username.trim().length < 3) {
      errors.push("Username must be at least 3 characters long");
    }
    if (!email?.includes("@")) {
      errors.push("Valid email is required");
    }

    if (errors.length > 0) {
      return sendValidationError(res, errors);
    }

    // Verificar si el usuario ya existe
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1 OR username = $2",
      [email.toLowerCase(), username.toLowerCase()],
    );

    if (existingUser.rows.length > 0) {
      return sendError(res, "User with this email or username already exists", 409);
    }

    const result = await pool.query(
      `INSERT INTO users (username, email) 
       VALUES ($1, $2) 
       RETURNING id, username, email`,
      [username.trim(), email.toLowerCase()],
    );

    const newUser = result.rows[0];

    sendSuccess(res, newUser, "User created successfully", 201);
  } catch (error) {
    sendError(res, "Error creating user", 500, error.message);
  }
};

const testConnection = async (req, res) => {
  try {
    const pgPool = pool.getPool();
    const options = pgPool.options || {};

    // useful debug info
    const configDebug = {
      user: options.user,
      host: options.host,
      database: options.database,
      port: options.port,
      envPGPORT: process.env.PGPORT,
      envDBPORT: process.env.DB_PORT,
    };
    console.log("[DB DEBUG] using config:", configDebug);

    const result = await pool.query("SELECT NOW()");
    sendSuccess(res, { ...configDebug, now: result.rows }, "Database connection successful");
  } catch (error) {
    const pgPool = pool.getPool();
    const options = pgPool.options || {};

    // return config + original error message so we can debug easily
    const configDebug = {
      user: options.user,
      host: options.host,
      database: options.database,
      port: options.port,
      envPGPORT: process.env.PGPORT,
      envDBPORT: process.env.DB_PORT,
    };
    console.error("[DB DEBUG ERROR]", error.message, configDebug);
    return res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
      config: configDebug,
    });
  }
};

const APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;

const addExpenseToSheet = async (req, res) => {
  try {
    const { fecha, descripcion, cambio, monto, responsable, medioPago, notas } = req.body;
    if (!fecha || !descripcion || !monto || !responsable) {
      return sendValidationError(res, ["fecha, descripcion, monto y responsable son requeridos"]);
    }
    if (!APPS_SCRIPT_URL) {
      return sendError(res, "GOOGLE_APPS_SCRIPT_URL no configurado", 500);
    }
    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fecha, descripcion, cambio, monto, responsable, medioPago, notas }),
      redirect: "follow",
    });
    const text = await response.text();
    let json;
    try { json = JSON.parse(text); } catch { json = { raw: text }; }
    if (!response.ok || json.error) {
      return sendError(res, json.error ?? "Error en Apps Script", 502);
    }
    return sendSuccess(res, json, "Gasto agregado a la planilla");
  } catch (error) {
    console.error("[addExpenseToSheet] error:", error.message);
    return sendError(res, "Error al agregar gasto", 500);
  }
};

const getTelegramMessages = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, update_id, from_id, from_name, from_username, chat_id, chat_type, text, received_at
       FROM telegram_messages
       ORDER BY received_at DESC
       LIMIT 100`
    );
    return sendSuccess(res, { messages: result.rows }, "Messages retrieved");
  } catch (error) {
    console.error("[getTelegramMessages] error:", error.message);
    return sendError(res, "Error retrieving messages", 500);
  }
};

module.exports = {
  getUsers,
  getExpenses,
  getTrips,
  createUser,
  testConnection,
  getTelegramMessages,
  addExpenseToSheet,
};
