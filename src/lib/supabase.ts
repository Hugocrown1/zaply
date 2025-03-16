import { DB_KEY, DB_URL } from '@/constants/env'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/interfaces/database.types'

// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(DB_URL, DB_KEY)

export default supabase
