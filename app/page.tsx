'use client';

import { useState, useEffect } from 'react';
import { Trash2, Plus, CheckCircle2 } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  createdAt: string;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error('Error loading todos:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  const addTodo = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      createdAt: new Date().toLocaleString()
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My To-Do App</h1>
          <p className="text-gray-600">Stay organized and productive</p>
        </div>

        {/* Add Todo Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo(e)}
              placeholder="What needs to be done?"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={addTodo}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Add
            </button>
          </div>
        </div>

        {/* Todo List */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Tasks ({todos.length})
            </h2>
            <CheckCircle2 className="text-green-500" size={24} />
          </div>

          {todos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No tasks yet. Add one above!</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">{todo.text}</p>
                    <p className="text-gray-500 text-sm mt-1">{todo.createdAt}</p>
                  </div>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="ml-4 text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                    title="Delete task"
                  >
                    <Trash2 size={20} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p className="text-sm">Built with Next.js • Deployed on Azure</p>
        </div>
      </div>
    </div>
  );
}