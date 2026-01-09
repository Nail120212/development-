local TweenService = game:GetService("TweenService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Workspace = game:GetService("Workspace")
local player = Players.LocalPlayer

local screenGui = Instance.new("ScreenGui")
screenGui.Name = "PZHubDNS"
screenGui.ResetOnSpawn = false
screenGui.Parent = player:WaitForChild("PlayerGui")

local mainFrame = Instance.new("Frame")
mainFrame.Size = UDim2.new(0, 280, 0, 190)
mainFrame.Position = UDim2.new(0.5, -140, 0.5, -95)
mainFrame.BackgroundColor3 = Color3.fromRGB(56, 71, 104)
mainFrame.BorderSizePixel = 0
mainFrame.Active = true
mainFrame.Draggable = true
mainFrame.Parent = screenGui

local corner = Instance.new("UICorner")
corner.CornerRadius = UDim.new(0, 14)
corner.Parent = mainFrame

local stroke = Instance.new("UIStroke")
stroke.Thickness = 3
stroke.Color = Color3.fromRGB(0, 120, 255)
stroke.Parent = mainFrame

local header = Instance.new("Frame")
header.Size = UDim2.new(1, 0, 0, 36)
header.BackgroundTransparency = 1
header.ClipsDescendants = true
header.Parent = mainFrame

local title = Instance.new("TextLabel")
title.Size = UDim2.new(1, -80, 1, 0)
title.Position = UDim2.new(0, 12, 0, 0)
title.BackgroundTransparency = 1
title.Text = "PZ Hub – DNS"
title.TextColor3 = Color3.new(1, 1, 1)
title.Font = Enum.Font.GothamBold
title.TextSize = 15
title.TextXAlignment = Enum.TextXAlignment.Left
title.Parent = header

local separator = Instance.new("Frame")
separator.Size = UDim2.new(1, 0, 0, 1)
separator.Position = UDim2.new(0, 0, 1, 0)
separator.BackgroundColor3 = Color3.fromRGB(0, 120, 255)
separator.BorderSizePixel = 0
separator.Parent = header

local minimizeButton = Instance.new("TextButton")
minimizeButton.Size = UDim2.new(0, 24, 0, 24)
minimizeButton.Position = UDim2.new(1, -60, 0, 6)
minimizeButton.BackgroundTransparency = 1
minimizeButton.Text = "–"
minimizeButton.TextColor3 = Color3.new(1, 1, 1)
minimizeButton.Font = Enum.Font.GothamBold
minimizeButton.TextSize = 22
minimizeButton.Parent = header

local closeButton = Instance.new("TextButton")
closeButton.Size = UDim2.new(0, 24, 0, 24)
closeButton.Position = UDim2.new(1, -30, 0, 6)
closeButton.BackgroundTransparency = 1
closeButton.Text = "X"
closeButton.TextColor3 = Color3.new(1, 1, 1)
closeButton.Font = Enum.Font.GothamBold
closeButton.TextSize = 18
closeButton.Parent = header

local contentFrame = Instance.new("ScrollingFrame")
contentFrame.Size = UDim2.new(1, -28, 1, -56)
contentFrame.Position = UDim2.new(0, 10, 0, 46)
contentFrame.BackgroundTransparency = 1
contentFrame.BorderSizePixel = 0
contentFrame.ScrollBarThickness = 4
contentFrame.ScrollBarImageColor3 = Color3.fromRGB(255, 0, 0)
contentFrame.AutomaticCanvasSize = Enum.AutomaticSize.Y
contentFrame.Parent = mainFrame

local uiListLayout = Instance.new("UIListLayout")
uiListLayout.Padding = UDim.new(0, 8)
uiListLayout.SortOrder = Enum.SortOrder.LayoutOrder
uiListLayout.Parent = contentFrame

local shine = Instance.new("Frame")
shine.Size = UDim2.new(0, 100, 1, 0)
shine.Position = UDim2.new(-1, 0, 0, 0)
shine.BackgroundColor3 = Color3.new(1, 1, 1)
shine.BackgroundTransparency = 0.5
shine.BorderSizePixel = 0
shine.Parent = header

local shineGradient = Instance.new("UIGradient")
shineGradient.Color = ColorSequence.new(Color3.fromRGB(0, 180, 255), Color3.fromRGB(0, 180, 255))
shineGradient.Transparency = NumberSequence.new{
	NumberSequenceKeypoint.new(0, 1),
	NumberSequenceKeypoint.new(0.3, 0.3),
	NumberSequenceKeypoint.new(0.7, 0.3),
	NumberSequenceKeypoint.new(1, 1)
}
shineGradient.Rotation = 45
shineGradient.Parent = shine

local function updateShine()
	while shine.Parent do
		shine.Position = UDim2.new(-1, 0, 0, 0)
		TweenService:Create(shine, TweenInfo.new(3, Enum.EasingStyle.Linear), {Position = UDim2.new(1, 100, 0, 0)}):Play()
		task.wait(3)
	end
end
task.spawn(updateShine)

local function createToggle(parent, text, callback)
	local toggleFrame = Instance.new("Frame")
	toggleFrame.Size = UDim2.new(1, 0, 0, 30)
	toggleFrame.BackgroundTransparency = 1
	toggleFrame.Parent = parent

	local label = Instance.new("TextLabel")
	label.Size = UDim2.new(0.55, 0, 1, 0)
	label.BackgroundTransparency = 1
	label.Text = text
	label.TextColor3 = Color3.new(1, 1, 1)
	label.Font = Enum.Font.Gotham
	label.TextSize = 14
	label.TextXAlignment = Enum.TextXAlignment.Left
	label.Parent = toggleFrame

	local button = Instance.new("TextButton")
	button.Size = UDim2.new(0, 60, 0, 24)
	button.Position = UDim2.new(1, -60, 0.5, -12)
	button.BackgroundColor3 = Color3.fromRGB(80, 180, 80)
	button.Text = "OFF"
	button.TextColor3 = Color3.new(1, 1, 1)
	button.Font = Enum.Font.GothamBold
	button.TextSize = 14
	button.Parent = toggleFrame

	local btnCorner = Instance.new("UICorner")
	btnCorner.CornerRadius = UDim.new(0, 8)
	btnCorner.Parent = button

	local gradient = Instance.new("UIGradient")
	gradient.Color = ColorSequence.new{
		ColorSequenceKeypoint.new(0, Color3.fromRGB(100, 200, 100)),
		ColorSequenceKeypoint.new(1, Color3.fromRGB(50, 130, 50))
	}
	gradient.Parent = button

	local enabled = false

	button.MouseButton1Click:Connect(function()
		enabled = not enabled
		if enabled then
			button.Text = "ON"
			button.BackgroundColor3 = Color3.fromRGB(100, 200, 100)
		else
			button.Text = "OFF"
			button.BackgroundColor3 = Color3.fromRGB(80, 180, 80)
		end
		callback(enabled)
	end)

	return toggleFrame
end

local function createToggleWithBox(parent, text, defaultVal, callback)
	local frame = Instance.new("Frame")
	frame.Size = UDim2.new(1, 0, 0, 30)
	frame.BackgroundTransparency = 1
	frame.Parent = parent

	local label = Instance.new("TextLabel")
	label.Size = UDim2.new(0.45, 0, 1, 0)
	label.BackgroundTransparency = 1
	label.Text = text
	label.TextColor3 = Color3.new(1, 1, 1)
	label.Font = Enum.Font.Gotham
	label.TextSize = 14
	label.TextXAlignment = Enum.TextXAlignment.Left
	label.Parent = frame

	local textbox = Instance.new("TextBox")
	textbox.Size = UDim2.new(0, 50, 0, 24)
	textbox.Position = UDim2.new(0.5, -25, 0.5, -12)
	textbox.BackgroundColor3 = Color3.fromRGB(70, 85, 120)
	textbox.Text = tostring(defaultVal)
	textbox.TextColor3 = Color3.new(1, 1, 1)
	textbox.Font = Enum.Font.Gotham
	textbox.TextSize = 13
	textbox.Parent = frame

	local tbCorner = Instance.new("UICorner")
	tbCorner.CornerRadius = UDim.new(0, 6)
	tbCorner.Parent = textbox

	local button = Instance.new("TextButton")
	button.Size = UDim2.new(0, 60, 0, 24)
	button.Position = UDim2.new(1, -60, 0.5, -12)
	button.BackgroundColor3 = Color3.fromRGB(80, 180, 80)
	button.Text = "OFF"
	button.TextColor3 = Color3.new(1, 1, 1)
	button.Font = Enum.Font.GothamBold
	button.TextSize = 14
	button.Parent = frame

	local btnCorner = Instance.new("UICorner")
	btnCorner.CornerRadius = UDim.new(0, 8)
	btnCorner.Parent = button

	local gradient = Instance.new("UIGradient")
	gradient.Color = ColorSequence.new{
		ColorSequenceKeypoint.new(0, Color3.fromRGB(100, 200, 100)),
		ColorSequenceKeypoint.new(1, Color3.fromRGB(50, 130, 50))
	}
	gradient.Parent = button

	local enabled = false

	button.MouseButton1Click:Connect(function()
		enabled = not enabled
		if enabled then
			button.Text = "ON"
			button.BackgroundColor3 = Color3.fromRGB(100, 200, 100)
		else
			button.Text = "OFF"
			button.BackgroundColor3 = Color3.fromRGB(80, 180, 80)
		end
		local amount = math.clamp(tonumber(textbox.Text) or defaultVal, 1, 500)
		callback(enabled, amount)
	end)

	textbox.FocusLost:Connect(function(enterPressed)
		if enabled and enterPressed then
			local amount = math.clamp(tonumber(textbox.Text) or defaultVal, 1, 500)
			callback(true, amount)
		end
	end)

	return frame
end

local function createButton(parent, text, callback)
	local frame = Instance.new("Frame")
	frame.Size = UDim2.new(1, 0, 0, 30)
	frame.BackgroundTransparency = 1
	frame.Parent = parent

	local label = Instance.new("TextLabel")
	label.Size = UDim2.new(0.6, 0, 1, 0)
	label.BackgroundTransparency = 1
	label.Text = text
	label.TextColor3 = Color3.new(1, 1, 1)
	label.Font = Enum.Font.Gotham
	label.TextSize = 14
	label.TextXAlignment = Enum.TextXAlignment.Left
	label.Parent = frame

	local button = Instance.new("TextButton")
	button.Size = UDim2.new(0, 80, 0, 26)
	button.Position = UDim2.new(1, -80, 0.5, -13)
	button.BackgroundColor3 = Color3.fromRGB(100, 200, 100)
	button.Text = "Click"
	button.TextColor3 = Color3.new(1, 1, 1)
	button.Font = Enum.Font.GothamBold
	button.TextSize = 14
	button.Parent = frame

	local btnCorner = Instance.new("UICorner")
	btnCorner.CornerRadius = UDim.new(0, 8)
	btnCorner.Parent = button

	local gradient = Instance.new("UIGradient")
	gradient.Color = ColorSequence.new{
		ColorSequenceKeypoint.new(0, Color3.fromRGB(100, 200, 100)),
		ColorSequenceKeypoint.new(1, Color3.fromRGB(50, 130, 50))
	}
	gradient.Parent = button

	button.MouseButton1Click:Connect(callback)

	return frame
end

local function createButtonWithBox(parent, text, defaultVal, callback)
	local frame = Instance.new("Frame")
	frame.Size = UDim2.new(1, 0, 0, 30)
	frame.BackgroundTransparency = 1
	frame.Parent = parent

	local label = Instance.new("TextLabel")
	label.Size = UDim2.new(0.45, 0, 1, 0)
	label.BackgroundTransparency = 1
	label.Text = text
	label.TextColor3 = Color3.new(1, 1, 1)
	label.Font = Enum.Font.Gotham
	label.TextSize = 14
	label.TextXAlignment = Enum.TextXAlignment.Left
	label.Parent = frame

	local textbox = Instance.new("TextBox")
	textbox.Size = UDim2.new(0, 50, 0, 24)
	textbox.Position = UDim2.new(0.5, -25, 0.5, -12)
	textbox.BackgroundColor3 = Color3.fromRGB(70, 85, 120)
	textbox.Text = tostring(defaultVal)
	textbox.TextColor3 = Color3.new(1, 1, 1)
	textbox.Font = Enum.Font.Gotham
	textbox.TextSize = 13
	textbox.Parent = frame

	local tbCorner = Instance.new("UICorner")
	tbCorner.CornerRadius = UDim.new(0, 6)
	tbCorner.Parent = textbox

	local button = Instance.new("TextButton")
	button.Size = UDim2.new(0, 80, 0, 26)
	button.Position = UDim2.new(1, -80, 0.5, -13)
	button.BackgroundColor3 = Color3.fromRGB(100, 200, 100)
	button.Text = "Click"
	button.TextColor3 = Color3.new(1, 1, 1)
	button.Font = Enum.Font.GothamBold
	button.TextSize = 14
	button.Parent = frame

	local btnCorner = Instance.new("UICorner")
	btnCorner.CornerRadius = UDim.new(0, 8)
	btnCorner.Parent = button

	local gradient = Instance.new("UIGradient")
	gradient.Color = ColorSequence.new{
		ColorSequenceKeypoint.new(0, Color3.fromRGB(100, 200, 100)),
		ColorSequenceKeypoint.new(1, Color3.fromRGB(50, 130, 50))
	}
	gradient.Parent = button

	button.MouseButton1Click:Connect(function()
		local num = tonumber(textbox.Text) or defaultVal
		callback(num)
	end)

	return frame
end

local function CreateTeleport(cf)
	local jeepnies = Workspace:FindFirstChild("Jeepnies")
	local jeepney = jeepnies and jeepnies:FindFirstChild(player.Name)
	local pos = cf.Position
	local _, yaw = cf:ToEulerAnglesYXZ()
	local flat = CFrame.new(pos) * CFrame.Angles(0, yaw, 0)
	if jeepney then
		jeepney:PivotTo(flat)
	elseif player.Character then
		player.Character:PivotTo(flat)
	end
end

createToggle(contentFrame, "Dupl Cash", function(enabled)
	if enabled then
		task.spawn(function()
			for i = 1, 3000 do
				pcall(function()
					ReplicatedStorage.Remotes.RecieveCash:FireServer({
						Value = 100,
						Password = 28782728922
					})
				end)
				task.wait(0.01)
			end
		end)
	end
end)

createToggleWithBox(contentFrame, "Exp Multiplier", 55, function(enabled, repeatamount)
	repeatamount = math.clamp(repeatamount, 1, 500)
	if enabled then
		local settings = { 
			repeatamount = repeatamount, 
			exceptions = {"SayMessageRequest"} 
		}

		local mt = getrawmetatable(game)
		local old = mt.__namecall
		setreadonly(mt, false)

		mt.__namecall = newcclosure(function(uh, ...)
			local args = {...}
			local method = getnamecallmethod()

			for _, v in pairs(settings.exceptions) do
				if uh.Name == v then
					return old(uh, ...)
				end
			end

			if method == "FireServer" or method == "InvokeServer" then
				for i = 1, settings.repeatamount do
					old(uh, unpack(args))
				end
			end

			return old(uh, unpack(args))
		end)

		setreadonly(mt, true)
	end
end)

createToggle(contentFrame, "Dupl Coins", function(enabled)
	if enabled then
		local Remotes = ReplicatedStorage:WaitForChild("Remotes")
		local RecieveCoin = Remotes:WaitForChild("RecieveCoin")
		local Jeepnies = Workspace:WaitForChild("Jeepnies")
		local Jeepney = Jeepnies:WaitForChild(player.Name)
		local PassengerValues = Jeepney:WaitForChild("PassengerValues")

		task.spawn(function()
			while task.wait(1) do
				if not enabled then break end
				local args = {{
					["PassengerValues"] = PassengerValues,
					["Password"] = 838875481,
					["Main"] = true,
					["Value"] = 50
				}}
				RecieveCoin:FireServer(unpack(args))
			end
		end)
	end
end)

createButtonWithBox(contentFrame, "Deduct Exp", 1, function(value)
	value = math.max(1, value)
	local args = {{
		["Value"] = value,
		["Password"] = 62199980
	}}
	ReplicatedStorage.Remotes.DeductExp:FireServer(unpack(args))
end)

createButton(contentFrame, "Get License", function()
	ReplicatedStorage.Remotes.PassedTheExam:FireServer({})
end)

createButton(contentFrame, "Guiginto Terminal", function()
	CreateTeleport(CFrame.new(-137.74, 19, -3010.95))
end)

createButton(contentFrame, "Guiginto Droppoint", function()
	CreateTeleport(CFrame.new(1056.62, 17, 3241.82))
end)

local confirmFrame = Instance.new("Frame")
confirmFrame.Size = UDim2.new(0, 220, 0, 100)
confirmFrame.Position = UDim2.new(0.5, -110, 0.5, -50)
confirmFrame.BackgroundColor3 = Color3.fromRGB(56, 71, 104)
confirmFrame.Visible = false
confirmFrame.Parent = screenGui

local confirmCorner = Instance.new("UICorner")
confirmCorner.CornerRadius = UDim.new(0, 12)
confirmCorner.Parent = confirmFrame

local confirmStroke = Instance.new("UIStroke")
confirmStroke.Thickness = 3
confirmStroke.Color = Color3.fromRGB(0, 120, 255)
confirmStroke.Parent = confirmFrame

local confirmText = Instance.new("TextLabel")
confirmText.Size = UDim2.new(1, -20, 0, 40)
confirmText.Position = UDim2.new(0, 10, 0, 10)
confirmText.BackgroundTransparency = 1
confirmText.Text = "Do you want to close?"
confirmText.TextColor3 = Color3.new(1, 1, 1)
confirmText.Font = Enum.Font.Gotham
confirmText.TextSize = 16
confirmText.Parent = confirmFrame

local yesButton = Instance.new("TextButton")
yesButton.Size = UDim2.new(0, 80, 0, 30)
yesButton.Position = UDim2.new(0, 30, 1, -40)
yesButton.BackgroundColor3 = Color3.fromRGB(0, 120, 255)
yesButton.Text = "Yes"
yesButton.TextColor3 = Color3.new(1, 1, 1)
yesButton.Font = Enum.Font.GothamBold
yesButton.TextSize = 15
yesButton.Parent = confirmFrame

local yesCorner = Instance.new("UICorner")
yesCorner.CornerRadius = UDim.new(0, 8)
yesCorner.Parent = yesButton

local noButton = Instance.new("TextButton")
noButton.Size = UDim2.new(0, 80, 0, 30)
noButton.Position = UDim2.new(1, -110, 1, -40)
noButton.BackgroundColor3 = Color3.fromRGB(0, 120, 255)
noButton.Text = "No"
noButton.TextColor3 = Color3.new(1, 1, 1)
noButton.Font = Enum.Font.GothamBold
noButton.TextSize = 15
noButton.Parent = confirmFrame

local noCorner = Instance.new("UICorner")
noCorner.CornerRadius = UDim.new(0, 8)
noCorner.Parent = noButton

local minimized = false

minimizeButton.MouseButton1Click:Connect(function()
	minimized = not minimized
	if minimized then
		TweenService:Create(mainFrame, TweenInfo.new(0.3, Enum.EasingStyle.Quad), {Size = UDim2.new(0, 280, 0, 36)}):Play()
		minimizeButton.Text = "+"
	else
		TweenService:Create(mainFrame, TweenInfo.new(0.3, Enum.EasingStyle.Quad), {Size = UDim2.new(0, 280, 0, 190)}):Play()
		minimizeButton.Text = "–"
	end
end)

closeButton.MouseButton1Click:Connect(function()
	confirmFrame.Visible = true
end)

yesButton.MouseButton1Click:Connect(function()
	screenGui:Destroy()
end)

noButton.MouseButton1Click:Connect(function()
	confirmFrame.Visible = false
end)
